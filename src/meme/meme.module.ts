import { Module } from '@nestjs/common';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Meme } from "../utils/entities/meme.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Meme])],
  controllers: [MemeController],
  providers: [MemeService]
})
export class MemeModule {}
