import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Device } from '@devices/entities/device.entity';
import { Repository } from 'typeorm';

describe('DevicesController', () => {
  let controller: DevicesController;
  let service: DevicesService;
  let deviceRepository: jest.Mocked<Repository<Device>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        DevicesService,
        {
          provide: getRepositoryToken(Device),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
    service = module.get<DevicesService>(DevicesService);
    deviceRepository = module.get(getRepositoryToken(Device));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call find on repository', async () => {
    await service.findAll();
    expect(deviceRepository.find).toHaveBeenCalledTimes(1);
  });
});
