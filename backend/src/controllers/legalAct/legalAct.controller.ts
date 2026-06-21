import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Controller, Get } from '@nestjs/common';
import { LegalAct } from '../../utils/Interfaces';

@Controller('legal-acts')
export class LegalActController {
  @Get()
  findAll(): LegalAct[] {
    const legalActs = JSON.parse(
      readFileSync(join(process.cwd(), 'data', 'legalActs.json'), 'utf-8'),
    ) as LegalAct[];
    return legalActs;
  }
}
