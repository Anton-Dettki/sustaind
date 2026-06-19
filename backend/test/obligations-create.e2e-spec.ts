import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

const obligationsPath = join(process.cwd(), 'data', 'obligations.json');

describe('POST /obligations/create (e2e)', () => {
  let app: INestApplication<App>;
  let originalObligations: string;

  beforeAll(() => {
    originalObligations = readFileSync(obligationsPath, 'utf-8');
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    writeFileSync(obligationsPath, originalObligations, 'utf-8');
    await app.close();
  });

  it('creates a new obligation and persists it', async () => {
    const newObligation = {
      title: 'E2E Test-Pflicht',
      legalActTitleShort: 'BImSchG',
      description: 'Angelegt durch E2E-Test',
      status: 'open',
    };

    const beforeResponse = await request(app.getHttpServer()).get('/obligations').expect(200);
    const countBefore = beforeResponse.body.length;

    const createResponse = await request(app.getHttpServer())
      .post('/obligations/create')
      .send(newObligation)
      .expect(201);

    expect(createResponse.body).toHaveLength(countBefore + 1);
    expect(createResponse.body).toEqual(
      expect.arrayContaining([expect.objectContaining(newObligation)]),
    );

    const afterResponse = await request(app.getHttpServer()).get('/obligations').expect(200);
    expect(afterResponse.body).toHaveLength(countBefore + 1);
    expect(afterResponse.body).toEqual(
      expect.arrayContaining([expect.objectContaining(newObligation)]),
    );
  });
});
