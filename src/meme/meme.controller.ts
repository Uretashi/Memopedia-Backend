import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { MemeService } from "./meme.service";
import { MemeDTO } from "../utils/dto/meme.dto";
import { Meme } from "../utils/entities/meme.entity";

@Controller('meme')
export class MemeController {

    constructor(private _memeService: MemeService) {}

    @Get('/:id')
    getMeme(@Param('id', ParseIntPipe) id: number): object {
        return this._memeService.getOneMeme(id).then((meme: Meme) => {
            return meme ?
                { res: meme, msg: 'meme found', status: HttpStatus.FOUND } :
                { msg: `no meme found for the given id : ${id}`, status: HttpStatus.NOT_FOUND }
        })
    }
}
