import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Meme } from "../utils/entities/meme.entity";
import { MemeDTO } from "../utils/dto/meme.dto";

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
     * @return Promise<Meme> -> founded meme for the given id
     */
    async getOneMeme(id: number): Promise<Meme | null> {
        return await this.memesEntityRepository.findOne({ where: { id_meme: id } });
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
     * @return Promise<Meme[}> -> random memes
     */
    async getRandomMemes(): Promise<Meme[] | null> {
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
        return await this.memesEntityRepository
            .createQueryBuilder()
            .where('id_meme IN (:ids)', { ids: randomMemeId })
            .getMany();
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
