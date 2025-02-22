// import {  MinLength , IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";
import { Prop } from "@nestjs/mongoose";
import { MinLength, IsEmail, IsNotEmpty, IsString, Matches, IsOptional, IsArray, IsObject, IsNumber, IsBoolean, IsEmpty } from "class-validator";
import { IsUniqueEmail } from "../unique-email/unique-email.service";
import { Rol } from "../generateRoleUser/roles.decorator";


///validation le schema for signUp user


export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string
    @IsNotEmpty()
    @IsString()
    readonly lastName: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'please enter th correct email' })

    readonly email: string

    readonly Place: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'Password too weak' })
    readonly password: string
    @IsOptional()
    // The role field is an array of strings
    @IsString({ each: true }) // Each element of the array should be a string
    Role?: string[];
   @Prop({required:false})
    readonly location:number

    // @IsNotEmpty()
    // @IsString()
    // readonly lastName: string
    // @IsNotEmpty()
    // @IsString()
    // readonly Genre: string
    // @IsNotEmpty()
    // @IsString()
    // readonly PhoneNumber: string
    // // @IsNumber()
    // @IsNotEmpty()
    // readonly PostalCode: number
    // @IsNotEmpty()
    // @IsString()
    // readonly Street: string
    // @IsNotEmpty()
    // @IsString()
    // readonly Country: string
    // @IsString()
    // readonly NumCarteIdentite: string

    // @IsEmpty()
    // @IsBoolean()
    // readonly  ACTIVE: boolean
    // @IsEmpty()
    // @IsBoolean()
    // readonly  BLOCKED: boolean
    // @IsEmpty()
    // @IsBoolean()
    // readonly  WAITING_VALIDATION: boolean
    // @IsEmpty()
    // @IsBoolean()
    // readonly  isactive: boolean
    // @IsEmpty()
    // @IsNumber()
    // readonly  ratting: number
    // @IsEmpty()
    // @IsNumber()
    // readonly  rattingNumber: number

}