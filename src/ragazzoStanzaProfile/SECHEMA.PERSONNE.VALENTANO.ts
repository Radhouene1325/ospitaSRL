import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Prense } from './TABLEAU.PRESENCE';
import { User } from 'src/AuthFile/userSchema/user.schema';

@Schema({
  timestamps: false,
})
export class PersonneValentano extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;
  // @Prop({ required: true })
  // password: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'user'})
  Idoperatore: User

 

  // @Prop({ required: true })
  // nazzionalita: string;
  @Prop({ required: true })
  email: string; ///placeCode fiscale
  // @Prop({ required: false })
  // foto: string;

  // @Prop({ required: true })
  // num_stanza: number;

  // @Prop()
  // professtion: string;

  // @Prop({ required: false })
  // cirruclum: string;
  // @Prop()
  @Prop()
  num_telephone: number;
  @Prop()
  Nationalita:string

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'presence' }]) // Reference to the User schema
  isPresent: Prense;
  // @Prop()
  // keySecret: string

  @Prop({ default: Date.now })
  date: Date;
}

export const SchemaPersonelValentano =
  SchemaFactory.createForClass(PersonneValentano);
