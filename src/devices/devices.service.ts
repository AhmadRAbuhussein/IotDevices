import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = this.devicesRepository.create(createDeviceDto);
    return this.devicesRepository.save(device);
  }

  async findAll(): Promise<Device[]> {
    return this.devicesRepository.find();
  }
}