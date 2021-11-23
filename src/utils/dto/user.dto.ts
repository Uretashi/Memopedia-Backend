import { IsString, IsNotEmpty, IsEmail, IsDate, IsNumber } from "class-validator";
import { Type, Transform } from "class-transformer";

export class UserDTO {

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    creation_date: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    last_login_date: Date;
}

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
