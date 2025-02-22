import {
  Body,
  Injectable,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PersonneValentano } from '../SECHEMA.PERSONNE.VALENTANO';
import { Model } from 'mongoose';
import * as escapeHtml from 'escape-html';
import { DTOPERSONNEVALENTANO } from '../DTO.PERSONNE.VALENTANO';
import { Prense } from '../TABLEAU.PRESENCE';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { User } from 'src/AuthFile/userSchema/user.schema';
import axios from 'axios';

import { EncryptionService } from '../CryptageData/Crpt.data';
import { CONSTANTE } from './Constante';
@Injectable()
export class PersoneeService {
  constructor(
    @InjectModel('personneValentano')
    private readonly Personel: Model<PersonneValentano>,
    @InjectModel('presence') private readonly Prisence: Model<Prense>,
    private readonly jwt: JwtService,
    @InjectModel('user') private userModels: Model<User>,
    private readonly cryptage: EncryptionService,
    private readonly MAN_presence: CONSTANTE
  ) {}

  ////create personne vivie in casa valentano

  async createPersonne({ dtoPersonne, fixedParameter }) {
    let personne;
    console.log(dtoPersonne.email);
    const verifWithCodeFiscale = await this.Personel.findOne({
      email: dtoPersonne.email,////EMAIL EN REALITER CODEFISCALE DE TYPE STRING
    });
    console.log(verifWithCodeFiscale);
    try {
      if (verifWithCodeFiscale === null) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(dtoPersonne.password, salt);
        personne = this.Personel.create({
          ...dtoPersonne,
          keySecret: fixedParameter,
          password: hashPassword,

        });
      }
      else if (verifWithCodeFiscale !== null) {
        personne = { message: 'user is existe dja' };
      }
    } catch (error) {
      throw new Error('error already exists.');
    }
    try {
     
      return personne;
    } catch (error) {
      return personne
    }


  }

  async loginPersonne(login, params): Promise<{ token: string } | any> {
    let user

    // const userLocation = await this.userModels.findOne({
    //   location: {
    //     $geoWithin: {
    //       $centerSphere: [[params.lan, params.lg], 0.15], // Convert maxDistance to radians
    //       // lan: '41.8904', lg: '12.5126'
    //     },
    //   },
    // })
    // console.log(userLocation)
    const getIpModem = await axios.get('https://ipinfo.io')
    console.log(getIpModem)
    const veirfyuser = await this.userModels.findOne({ Modemip: getIpModem?.data.ip })

    console.log(veirfyuser)



    if (veirfyuser === null) {
      return user = ({ message: 'return to centro ou bien attendre permission de loperateur' })
    } else {
      user = await this.Personel.findOne({
        email: login.email,////en reatliter is e codishe fiscale
      });
      if (!user) {
        throw new UnauthorizedException('invalide codefischale or password');
      }



      if (user.keySecret === params?.keySecret) {



        const passwordMatch = await bcrypt.compare(login.password, user.password);
        if (!passwordMatch) {
          throw new UnauthorizedException('invalide  password');
        }
        console.log(user.Idoperatore.includes(veirfyuser._id))
        if (user.Idoperatore.includes(veirfyuser._id) === false) {


          user = await this.Personel.findOneAndUpdate({ _id: user._id }, { $push: { Idoperatore: veirfyuser._id } }, { new: true }).
            populate({ path: 'Idoperatore' })

        }
        console.log(veirfyuser.Ragazzo.includes(user._id))
        if (veirfyuser.Ragazzo.includes(user._id) === false) {
          await this.userModels.findOneAndUpdate({ _id: veirfyuser._id }, { $push: { Ragazzo: user._id } }, { new: true })
        }

        const token = this.jwt.sign({
          email: login.email,
          password: login.password,
        });
        console.log(token)
        // res.cookie('token', token)
        console.log('conncet seccs')
        return { token, user };
      } else {
        if (params.keySecret === 'undefined') {
          return this.Personel.findOneAndDelete({ _id: user._id }).select('name lastName email')
        } else {

          throw new UnauthorizedException('please conncet with your phone');

        }

      }
    }



    // return user
  }


  async createRagazo(push, id) {
    const data = await this.cryptage.endecrypt(push.data)
    console.log("data is  decrypted " + data)
    let ajoute
    console.log(id)
    const verifyBuId = await this.Personel.findOne({ name: data.name, lastName: data.lastName,Idoperatore:id})

    console.log(verifyBuId)
    switch (verifyBuId) {
      case null:

        console.log("null ajouter avec succes"); 
        const add = await this.Personel.create({
          ...data,
          Idoperatore: id
        })
        console.log(add)
        if (add) {
          ajoute = await this.Personel.findOne({ _id: add._id,Idoperatore:id })
            .populate({ path: 'isPresent', populate: { path: 'personne' } });

        }
  
        break;

      default:
        ajoute = ({ message: "this personne is allredy existe" })
    }
    console.log(ajoute)
    let crypt = await this.cryptage.encrypt(ajoute)
    return crypt
  }

  async updatePresence(data, prise: string, req): Promise<any> {
  
    let h;
    let TIME_LAST_SINGATURE;
    const decrptUser = await this.cryptage.endecrypt(data.data)
 
    const decyptImage = await this.cryptage.endecrypt(prise)
   

    const verifeIp = await this.Personel.findOne({ name: decrptUser.name, lastName: decrptUser.lastName });
   
    if (!verifeIp) {
      throw new UnauthorizedException('per favore registro questo ragazo no ce piui in data base ');

    }
    const last_signature = await this.Prisence.findOne({ personne: verifeIp._id }).sort({ _id: -1 })
   


    const TIME_NOW = new Date().toLocaleDateString()
    console.log(TIME_NOW)
   

    if (last_signature === null) {

      h = await this.Prisence.create({
        personne: verifeIp._id,
        prsence: decyptImage,
      });
      // console.log(h)
      const data = { verifeIp, h }
      await this.MAN_presence.manupulate_presence(data)

    } else {

      TIME_LAST_SINGATURE = new Date(last_signature.date).toLocaleDateString()

      if (TIME_NOW !== TIME_LAST_SINGATURE) {

        h = await this.Prisence.create({
          personne: verifeIp._id,
          prsence: decyptImage,
        });
        
        const data = { verifeIp, h }
        await this.MAN_presence.manupulate_presence(data)
      } else {
        const data = { last_signature, decyptImage }
        h = await this.MAN_presence.updatePrsence(data)

      }

    }
   
    var crypt = await this.cryptage.encrypt(h)


    return JSON.stringify(crypt);
  }
  // async deletePresence(id: string): Promise<any> {
  //     return this.Prisence.findOneAndDelete({ _id: id })
  // } 
  async findAllPersonne(id) {
    console.log(id)
    const all = await this.Personel.find({Idoperatore:id})
      
      .populate({ path: 'isPresent' });
    // console.log(all + "les ragazo is her")

    const isCrypte = await this.cryptage.encrypt(all)
    console.log(isCrypte)
 
    return isCrypte 

  }

  async findAllPresence() {
    const presenceById = await this.Prisence.find()




    return presenceById;
  }



}
