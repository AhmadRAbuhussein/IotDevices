import { Controller, Post } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

@Controller('mock-data')
export class MockDataController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Post('generate')
  async generateMockData() {
    await this.mockDataService.generateMockData();
    return { message: 'Mock time-series data inserted successfully!' };
  }
}
