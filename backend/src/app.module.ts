import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LegalActController } from './legalAct.controller';

@Module({
  imports: [],
  controllers: [AppController, LegalActController],
  providers: [AppService],
})
export class AppModule {}
