import { IsNotEmpty } from "class-validator";
import { User } from "src/AuthFile/userSchema/user.schema";



export class ValideComent {
    @IsNotEmpty()
    readonly title?: string

    @IsNotEmpty()
    readonly content?: string
    @IsNotEmpty()
    user: User
}