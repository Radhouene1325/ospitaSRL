import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";


export class RoleDto {
    @IsOptional()
    // The role field is an array of strings
  
    @IsString({ each: true }) // Each element of the array should be a string
     Role: string[];
}



