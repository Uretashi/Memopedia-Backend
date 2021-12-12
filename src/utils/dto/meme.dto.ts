import { IsString, IsNotEmpty, IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";


export class MemeDTO {

    fileBuffer64?: string;

    id_meme?: number;

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
    @Type(() => Number)
    like_nb: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    author_id: number;
}
