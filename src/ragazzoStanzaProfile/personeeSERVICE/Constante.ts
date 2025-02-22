import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Prense } from "../TABLEAU.PRESENCE";
import { PersonneValentano } from "../SECHEMA.PERSONNE.VALENTANO";
// this function is to manipulate all the presence of all ragazo in nest js .
@Injectable()

export class CONSTANTE {

    constructor(
        @InjectModel('personneValentano')
        private readonly Personel: Model<PersonneValentano>,
        @InjectModel('presence') private readonly Prisence: Model<Prense>,
    ) { }

    async manupulate_presence(data: any) {
        // console.log(data)

        await this.Personel.findOneAndUpdate(
            { _id: data.verifeIp._id },
            { $push: { isPresent: data.h._id } },
            { new: true },
        ).populate({ path: 'isPresent', populate: { path: 'personne' } });
    }

    async updatePrsence(data: any) {
        // console.log('hello is arive')
        // console.log(data)

     const f=  await this.Prisence.findOneAndUpdate(
            { _id: data.last_signature._id },
            { $set: {prsence: data.decyptImage  } },
            { new: true },
        )
        // console.log(f)
        return f
    }

}