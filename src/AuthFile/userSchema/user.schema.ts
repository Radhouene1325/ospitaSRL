import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { MinLength, IsEmail, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
@Schema({

  timestamps: false
})

export class User {

  @Prop()
  name: string
  @Prop({ required: false })
  lastName: string
  @Prop({ unique: false })
  email: string


  @Prop()
  password: string

  @Prop()
  Modemip: string

  @Prop()
  Place: string
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'personneValentano' }])
  Ragazzo: string

  // @Prop({
  //   type: { type: String, default: 'Point' },
  //   coordinates: [Number],
    
    
  // })
  // location: number[];

  @Prop({ type: [String] }) // Default role is set to 'user'
  Role: string[];

}
export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({ location: '2dsphere' })