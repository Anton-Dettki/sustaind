import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './app.service';
import { LegalActController } from './controllers/legalAct/legalAct.controller';
import { ObligationsController } from './controllers/obligations/obligations.controller';

@Module({
  imports: [],
  controllers: [AppController, LegalActController, ObligationsController],
  providers: [AppService],
})
export class AppModule {}
