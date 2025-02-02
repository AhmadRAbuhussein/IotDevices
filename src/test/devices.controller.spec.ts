import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DevicesModule } from '../devices/devices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../devices/entities/device.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('DevicesController (Integration Test)', () => {
  let app: INestApplication;
  let repository: Repository<Device>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DevicesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test_user',
          password: 'test_pass',
          database: 'test_db',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get<Repository<Device>>(getRepositoryToken(Device));
  });

  afterAll(async () => {
    await repository.query('DELETE FROM device');
    await app.close();
  });

  it('POST /devices should create a device', async () => {
    const response = await request(app.getHttpServer())
      .post('/devices')
      .send({ name: 'Test Device' });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Device');

    const device = await repository.findOne({ where: { name: 'Test Device' } });
    expect(device).toBeDefined();
  });

  it('GET /devices should return devices', async () => {
    await repository.save({ name: 'Device 1' });

    const response = await request(app.getHttpServer()).get('/devices');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});