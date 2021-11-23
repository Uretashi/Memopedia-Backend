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

    async getOneMeme(id: number): Promise<Meme | null> {
        return await this.memesEntityRepository.findOne({ where: { id_meme: id } });
    }
}
