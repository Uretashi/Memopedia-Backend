import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Meme } from "../utils/entities/meme.entity";
import { MemeDTO } from "../utils/dto/meme.dto";
import { readFileSync } from "fs";

@Injectable()
export class MemeService {

    constructor(
        @InjectRepository(Meme)
        private memesEntityRepository: Repository<Meme>,
    ) {}

    /**
     * find meme that match the id parameter
     *
     * @param {number} id -> the searched meme id
     * @return Promise<MemeDTO> -> founded meme for the given id
     */
    async getOneMeme(id: number): Promise<MemeDTO | null> {
        // query
        const meme = await this.memesEntityRepository.findOne({ where: { id_meme: id } });

        // read the buffer of the associated image, and create a base64 stream for the render
        if(meme) {
            // cast Meme to MemeDTO
            const memeDto = meme as MemeDTO;
            // buffer encoded in base64
            const base64buffer = readFileSync(`./meme/${meme.url}`).toString('base64');
            // ready html source for the image/video
            memeDto.fileBuffer64 = `data:image/${meme.url.split('.')[1]};base64,${base64buffer}`;
            return memeDto;
        }

        return null;
    }

    /**
     * get memes that match with any of the given tags
     *
     * @param {string[]} tags -> tags to match
     * @return Promise<Meme[]> -> memes that matched with the given tags
     */
    async getMemesByTags(tags: string[]): Promise<Meme[] | null> {
        return await this.memesEntityRepository
            .createQueryBuilder()
            .where('tags RLIKE :tags', { tags: tags.join('|') })
            .getMany();
    }

    /**
     * get 5 random memes
     *
     * @return Promise<MemeDTO[]> -> random memes
     */
    async getRandomMemes(): Promise<MemeDTO[] | null> {
        //get the last table entry for the id
        const lastMeme = await this.memesEntityRepository.findOne({order: { id_meme: 'DESC' }});

        //random id array init
        let randomMemeId = [];

        while(randomMemeId.length < 5) {
            //generate a random number between 1 and the last entry id
            const randomId = Math.floor(Math.random() * (lastMeme.id_meme - 1 + 1)) + 1;

            //if the generated number are not already inside the array, push the number onto
            if(!randomMemeId.includes(randomId)) randomMemeId.push(randomId);
        }

        //return memes that have one of the random id
        const memes = await this.memesEntityRepository
            .createQueryBuilder()
            .where('id_meme IN (:ids)', { ids: randomMemeId })
            .getMany();

        // if memes found
        if(memes) {
            // for each meme, read the buffer of the associated image, and create a base64 stream for the render
            memes.map((meme: MemeDTO) => {
                // buffer encoded in base64
                const base64buffer = readFileSync(`./meme/${meme.url}`).toString('base64');
                // type of source ("video" if mp4, image otherwise)
                const type = meme.url.split('.')[1] === 'mp4' ? 'video' : 'image';

                // ready html source for the image/video
                meme.fileBuffer64 = `data:${type}/${meme.url.split('.')[1]};base64,${base64buffer}`;
            });

            return memes;
        }

        return null;
    }

    /**
     * Add a new entry in meme database
     *
     * @async
     * @param {MemeDTO} meme -> the new meme data
     * @return Promise<number> -> new account id (for validation)
     */
    async postNewMeme(meme: MemeDTO): Promise<number | null> {
        // insert into the "meme" table the new meme
        const addNewMeme =  await this.memesEntityRepository
            .createQueryBuilder()
            .insert()
            .into(Meme)
            .values({...meme})
            .execute();

        //return the new created meme id
        return addNewMeme.raw.insertId;
    }
}
