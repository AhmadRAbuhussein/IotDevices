import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { Device } from '@devices/entities/device.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DevicesService', () => {
  let service: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevicesService,
        {
          provide: getRepositoryToken(Device),
          useValue: {
            find: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
