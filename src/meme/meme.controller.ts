import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Post, Query, UploadedFile, UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { MemeService } from "./meme.service";
import { MemeDTO } from "../utils/dto/meme.dto";
import { Meme } from "../utils/entities/meme.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs";


@Controller('memes')
export class MemeController {

    constructor(private _memeService: MemeService) {}

    /**
     * get random memes
     *
     * @return Object -> memes if found, error if not
     */
    @Get()
    getRandomMemes(): object {
        return this._memeService.getRandomMemes().then((memes: MemeDTO[]) => {
            return memes ?
                { res: memes, msg: 'memes found', status: HttpStatus.FOUND } :
                { msg: 'Error while retrieving random memes :/', status: HttpStatus.NOT_FOUND }
        });
    }

    /**
     * get one meme
     *
     * @param {number} id -> searched meme id
     * @return Object -> the meme itself if found, error if not
     */
    @Get('/one/:id')
    getMeme(@Param('id', ParseIntPipe) id: number): object {
        return this._memeService.getOneMeme(id).then((meme: Meme) => {
            return meme ?
                { res: meme, msg: 'meme found', status: HttpStatus.FOUND } :
                { msg: `no meme found for the given id : ${id}`, status: HttpStatus.NOT_FOUND };
        });
    }

    /**
     * find memes where tags match for the given parameter
     *
     * @param {string[]} tags -> search tags
     * @return Object -> founded memes for the give tags, error if not found
     */
    @Get('/byTag')
    findByTags(@Query('tags', new ParseArrayPipe(
        { items: String, separator: ',' })
    ) tags: string[]): object {
        return this._memeService.getMemesByTags(tags).then((memes: MemeDTO[]) => {
            return memes.length > 1 ?
                { res: memes, msg: 'memes found for given tags', status: HttpStatus.FOUND } :
                { msg: 'no memes found for given tags :/', status: HttpStatus.NOT_FOUND }
        })
    }

    /**
     * add a new meme to the DB
     *
     * @param {MemeDTO} meme -> new meme to insert
     * @param {any} file
     * @return Object -> the new created mem, or error
     */
    @Post('/postMeme')
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
    postNewMeme(@UploadedFile() file: any, @Body() meme: MemeDTO): object {

        writeFile(`./meme/${file.originalname}`, file.buffer, (err) => {
            if (err) throw err;
        });

        return this._memeService.postNewMeme(meme).then((newMemeId: number) => {
            return newMemeId ?
                { res: newMemeId, msg: 'New meme added hehehehehe', status: HttpStatus.CREATED } :
                { msg: 'Error while trying to add new meme', status: HttpStatus.BAD_REQUEST }
        });
    }
}
