import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceDatum } from '../device-data/entities/device-datum.entity';
import { Device } from '../devices/entities/device.entity';

@Injectable()
export class MockDataService {
  constructor(
    @InjectRepository(DeviceDatum)
    private readonly deviceDatumRepository: Repository<DeviceDatum>,

    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  async generateMockData(): Promise<void> {
    console.log('Generating mock time-series data...');

    const devices = await this.deviceRepository.find();
    if (devices.length === 0) {
      console.warn('No devices found! Please add some devices first.');
      return;
    }

    const now = new Date();
    const dataEntries: DeviceDatum[] = [];

    for (let i = 0; i < 1000; i++) {
      const timestamp = new Date(now.getTime() - i * 1000); // Every second

      const device = devices[Math.floor(Math.random() * devices.length)];

      const entry = this.deviceDatumRepository.create({
        timestamp,
        temperature: Math.random() * 40 + 10, // 10°C - 50°C
        humidity: Math.random() * 100, // 0% - 100%
        pressure: Math.random() * 20 + 980, // 980hPa - 1000hPa
        device,
      });

      dataEntries.push(entry);
    }

    await this.deviceDatumRepository.save(dataEntries);
    console.log('Mock data inserted successfully!');
  }
}
