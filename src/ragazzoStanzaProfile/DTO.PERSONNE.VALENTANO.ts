import { Prop } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DTOPERSONNEVALENTANO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly nazzionalita: string;

  @IsString()
  readonly email: string; ///placeCodeFiscale

  @IsString()
  @IsNotEmpty()
  readonly foto: string;

  @IsNumber()
  // @IsNotEmpty()
  readonly num_stanza: number;

  @IsString()
  @IsNotEmpty()
  readonly cirruclum: string;

  readonly num_telephone: number;
}
 