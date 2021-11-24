import { IsString, IsNotEmpty, IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class MemeDTO {

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    tags: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    publication_date: Date;

    @IsNumber()
    @IsNotEmpty()
    like_nb: number;

    @IsNumber()
    @IsNotEmpty()
    author_id: number;
}
