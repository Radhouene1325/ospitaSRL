import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, DocumentCommet } from '../SchemasComment/comment/comment';

@Injectable()
export class ComentserviceService {

    constructor(
        @InjectModel('commentaire') 
        private readonly commentModel:Model<DocumentCommet>
    ){}


    async createComment(coment):Promise<Comment|any>{
        const isComntCreate=await this.commentModel.create({
            ...coment
        })

        return isComntCreate
    }

    async getComment():Promise<Comment|any>{

        return this.commentModel.find().populate({path:'user'})

    }

}
