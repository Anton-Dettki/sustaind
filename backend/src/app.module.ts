import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './app.service';
import { LegalActController } from './controllers/legalAct/legalAct.controller';

@Module({
  imports: [],
  controllers: [AppController, LegalActController],
  providers: [AppService],
})
export class AppModule {}
