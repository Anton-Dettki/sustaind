import { Module } from '@nestjs/common';
import { LegalActController } from './controllers/legalAct/legalAct.controller';
import { ObligationsController } from './controllers/obligations/obligations.controller';

@Module({
  imports: [],
  controllers: [LegalActController, ObligationsController],
})
export class AppModule {}
