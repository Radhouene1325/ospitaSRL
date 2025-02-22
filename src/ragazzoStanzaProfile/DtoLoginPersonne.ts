import { IsNotEmpty, IsString } from 'class-validator';

export class DtoLoginPersonne {
  @IsNotEmpty()
  @IsString()
  private readonly email: string;

  @IsNotEmpty()
  @IsString()
  private readonly password: string;
  
}
 