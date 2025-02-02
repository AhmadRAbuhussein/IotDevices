import { Module } from '@nestjs/common';
import { DeviceDataService } from './device-data.service';
import { DeviceDataController } from './device-data.controller';
import { DeviceDatum } from './entities/device-datum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceDatum]), DevicesModule],
  controllers: [DeviceDataController],
  providers: [DeviceDataService],
})
export class DeviceDataModule {}
