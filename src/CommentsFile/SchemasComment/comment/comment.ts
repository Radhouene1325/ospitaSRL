import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import mongoose, { Document } from "mongoose";
import { User } from "src/AuthFile/userSchema/user.schema";
import { Types } from 'mongoose';
export type DocumentCommet = Comment & Document



@Schema({
    timestamps: true
})

export class Comment  {
    
    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true }) // Reference to the User schema
    user: User;

    @Prop()

    title: string

    @Prop()
 
    content: string

    @Prop({ default: Date.now })
    date: Date



}

export const CommentSchemas = SchemaFactory.createForClass(Comment)
