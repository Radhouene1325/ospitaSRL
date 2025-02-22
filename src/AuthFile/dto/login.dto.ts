
// import {IsEmpty, MinLength , IsEmail, IsNotEmpty, IsString} from "class-validator";

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

///validation le schema for login user
export class loginDto {
   
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string

    
}