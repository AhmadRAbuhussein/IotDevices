import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockDataService } from './mock-data.service';
import { MockDataController } from './mock-data.controller';
import { DeviceDatum } from '../device-data/entities/device-datum.entity';
import { Device } from '../devices/entities/device.entity';
import { DataCommand } from './mock-data.command';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceDatum, Device])],
  providers: [MockDataService, DataCommand],
  controllers: [MockDataController],
  exports: [MockDataService],
})
export class MockDataModule {
}
