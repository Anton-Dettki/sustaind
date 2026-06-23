import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Obligation } from '../../utils/Interfaces';

const obligationsPath = join(process.cwd(), 'data', 'obligations.json');

@Controller('obligations')
export class ObligationsController {
  private readObligations(): Obligation[] {
    return JSON.parse(readFileSync(obligationsPath, 'utf-8')) as Obligation[];
  }

  private writeObligations(obligations: Obligation[]): void {
    writeFileSync(
      obligationsPath,
      `${JSON.stringify(obligations, null, 2)}\n`,
      'utf-8',
    );
  }

  @Get()
  findAll(): Obligation[] {
    return this.readObligations();
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ): Obligation[] {
    const obligations = this.readObligations();
    const obligation = obligations.find(
      (obligation) => obligation.id === id,
    );
    if (!obligation) {
      throw new NotFoundException('Obligation not found');
    }
    obligation.status = body.status;
    this.writeObligations(obligations);
    return obligations;
  }

  @Post('create')
  create(
    @Body()
    body: {
      title: string;
      legalActTitleShort: string;
      description: string;
      status: string;
    },
  ): Obligation[] {
    const obligations = this.readObligations();
    obligations.push({ ...body, id: "122" });
    this.writeObligations(obligations);
    return obligations;
  }
}
