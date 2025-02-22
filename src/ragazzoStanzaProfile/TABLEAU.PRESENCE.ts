import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PersonneValentano } from './SECHEMA.PERSONNE.VALENTANO';

@Schema({
  timestamps: true,
})
export class Prense extends Document {
  @Prop()
  prsence: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'personneValentano' }) // Reference to the User schema
  personne: PersonneValentano;

  @Prop({ default: Date.now })
  date: Date;
}

export const SchamaPresence = SchemaFactory.createForClass(Prense);
