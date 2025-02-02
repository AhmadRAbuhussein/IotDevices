import { Controller, Get, Post, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { DeviceDataService } from './device-data.service';
import { CreateDeviceDatumDto } from './dto/create-device-datum.dto';

@Controller('devices/:id/data')
export class DeviceDataController {
  constructor(private readonly deviceDataService: DeviceDataService) {}

  @Post()
  async addData(@Param('id') id: number, @Body() createDeviceDatumDto: CreateDeviceDatumDto) {
    return await this.deviceDataService.addData(id, createDeviceDatumDto);
  }

  @Get()
  async getData(
    @Param('id') id: number,
    // @Query('start') start: string,
    // @Query('end') end: string
  ) {
    // if (!start || !end) {
    //   throw new NotFoundException('Start and End timestamps are required');
    // }
    return await this.deviceDataService.getData(id);
  }
}
