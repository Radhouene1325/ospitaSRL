import {
  Body,
  Injectable,
  Param,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../userSchema/user.schema';

import { Model } from 'mongoose';
// import  {bcrypt,genSalt,hash,compare} from 'bcryptjs'
import { compare, genSalt, hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signUP.dto';
import { loginDto } from '../dto/login.dto';
import { RoleDto } from '../dto/updateRoleUser';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import axios from 'axios';
@Injectable()
export class AuthServiceService {
  constructor(
    @InjectModel('user') private userModels: Model<User>,
    private jwtService: JwtService,

  ) { }
  async signUp(signUpDto): Promise<{ token: string }> {
    // const { name, email, password } = signUpDto
    const getIpModem = await axios.get('https://ipinfo.io')
    // console.log(getIpModem?.data)
    const userIp = getIpModem?.data.ip
    // const locationResponse = await axios.get(`https://ipapi.co/${userIp}/json/`);
    // const { latitude, longitude } = locationResponse.data;
    // console.log(latitude, longitude)
    console.log(signUpDto.Role)
    let user;
    if (signUpDto.Role === "Admin") {
      try {
        const salt = await bcrypt.genSalt(10);
        //1 hachage du password
        const hashPassword = await bcrypt.hash(signUpDto.password, salt);


        user = new this.userModels({
          ...signUpDto,
          password: hashPassword,

        });

        return user

        //2 create the user

        // const userCreate = await this.userModels.create(
        //     { ...signUpDto, password: await hash(signUpDto.password, await genSalt(10)) }
        // )
        // // console.log(user)
      } catch (error) {
        console.log(error);
      } finally {
        await user.save();
      }
      return user;
    } else {

      try {
        const salt = await bcrypt.genSalt(10);
        //1 hachage du password
        const hashPassword = await bcrypt.hash(signUpDto.password, salt);
        if (getIpModem?.data.ip) {

          user = new this.userModels({
            ...signUpDto,
            password: hashPassword,
            Modemip: getIpModem?.data.ip,
            // location: {
            //   type: 'Point',
            //   coordinates: [signUpDto.location.ln, signUpDto.location.lg],
            // },
          });

          return user
        } else {
          user = ({ message: 'verify modem connction' })
        }
        //2 create the user

        // const userCreate = await this.userModels.create(
        //     { ...signUpDto, password: await hash(signUpDto.password, await genSalt(10)) }
        // )
        // // console.log(user)
      } catch (error) {
        console.log(error);
      } finally {
        await user.save();
      }
      return user;
    }
  }

  async getUserByEmail(@Body() email: string): Promise<User | undefined> {
    console.log(email);
    const user = await this.userModels.findOne({ email: email });
    return user;
  }

  async login(loginDto): Promise<{ token: string } | User | any> {
    const { email, password } = loginDto
    let user

    const getIpModem = await axios.get('https://ipinfo.io')
    // console.log(getIpModem?.data)
    // location: { ln: 41.8904, lg: 12.5126 },
    // const locationResponse = await axios.get(`http://ip-api.com/json/${getIpModem.data.ip}`);
    // const { latitude, longitude } = locationResponse.data;
    // console.log(latitude,longitude)

    // const userLocation = await this.userModels.findOne({
    //   location: {
    //     $geoWithin: {
    //       $centerSphere: [[41.8704, 12.5026], 0.0015], // Convert maxDistance to radians

    //     },
    //   },      
    // })
    // console.log(userLocation)
    user = await this.userModels.findOne({ email: loginDto.email });
    // console.log(user)
    if (!user) {
      throw new UnauthorizedException('invalide email or password');
    }
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('invalide  password');
    }else if (user?.Role[0] === 'Operator') {
 
      console.log('operateur inside campo controlle the ragazzo')
      if (user.Modemip !== getIpModem.data.ip) {
        user = await this.userModels.findOneAndUpdate({ _id: user._id }, { $set: { Modemip: getIpModem?.data?.ip } }, { new: true })
      }
      const token = this.jwtService.sign({
        email: loginDto.email,
        password: loginDto.password,
      });

      // res.cookie('token', token) 
      // const secretKey = process.env.SECRET_KEY
      // console.log(secretKey)
      // const cipher = crypto.createCipher('aes-256-cbc', secretKey);
      // const encryptedData = Buffer.concat([cipher.update(JSON.stringify({token,user})), cipher.final()]).toString('hex');
      // console.log(encryptedData)
      return { token, user };
    } else { 
      console.log('is admin connect')
      // if (!user) {
      //   throw new UnauthorizedException('invalide email or password');
      // }
      // const passwordMatch = await bcrypt.compare(
      //   loginDto.password,
      //   user.password,
      // );
      // if (!passwordMatch) {
      //   throw new UnauthorizedException('invalide  password');
      // }

      const token = this.jwtService.sign({
        email: loginDto.email,
        password: loginDto.password,
      });
      // res.cookie('token', token)
      // const secretKey = process.env.SECRET_KEY
      // console.log(secretKey)
      // const cipher = crypto.createCipher('aes-256-cbc', secretKey);
      // const encryptedData = Buffer.concat([cipher.update(JSON.stringify({token,user})), cipher.final()]).toString('hex');
      // console.log(encryptedData)
      return { token, user };
    }


    // return user
  }

  async updateRole(id: string, newRole): Promise<User> {
    console.log(newRole.Role);
    const role = await this.userModels.findByIdAndUpdate(
      id,
      { $set: { Role: newRole.Role } },
      { new: true },
    );

    return role;
  }

  async deleteRole(id: string, deleteRole): Promise<User> {
    console.log(deleteRole.h);
    console.log(JSON.stringify(deleteRole.h));
    const roleDelete = await this.userModels.findByIdAndUpdate(
      id,
      { $pull: { Role: deleteRole.h } },
      { new: true },
    );

    console.log(roleDelete);
    return roleDelete;
  }

  async isAuthenticated(id: any): Promise<User | any> {
    console.log(id);
    const isAuth = await this.userModels.findOne({ _id: id });

    return isAuth;
  }
}
