import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateDeviceDatumDto } from './dto/create-device-datum.dto';
import { DeviceDatum } from './entities/device-datum.entity';
import { Device } from '../devices/entities/device.entity';

@Injectable()
export class DeviceDataService {
  constructor(
    @InjectRepository(DeviceDatum)
    private readonly deviceDataRepository: Repository<DeviceDatum>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async addData(deviceId: number, createDeviceDatumDto: CreateDeviceDatumDto) {
    const device = await this.deviceRepository.findOne({ where: { id: deviceId } });
    if (!device) {
      throw new NotFoundException('Device not found');
    }

    const newData = this.deviceDataRepository.create({
      device,
      timestamp: new Date(),
      temperature: createDeviceDatumDto.temperature,
      humidity: createDeviceDatumDto.humidity,
      pressure: createDeviceDatumDto.pressure,
    });

    return await this.deviceDataRepository.save(newData);
  }

  async getData(deviceId: number) {
    const device = await this.deviceRepository.findOne({ where: { id: deviceId } });
    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return await this.deviceDataRepository.find({
      where: {
        device: { id: deviceId },
        // timestamp: Between(new Date(start), new Date(end)),
      },
      order: { timestamp: 'DESC' },
    });
  }
}