import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemeModule } from './meme/meme.module';
import { AccountModule } from './account/account.module';


@Module({
  imports: [TypeOrmModule.forRoot(),
    MulterModule.register({
      dest: './meme'
    }),
    MemeModule,
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
