import { IsString, IsNotEmpty, IsDate, IsNumber } from "class-validator";

export class MemeDTO {

    @IsNumber()
    id?: number;

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
    publication_date: Date;

    @IsNumber()
    @IsNotEmpty()
    like_nb: number;

    @IsNumber()
    @IsNotEmpty()
    author_id: number;
}
