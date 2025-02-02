import { Injectable } from '@nestjs/common';
import { MockDataService } from './mock-data.service';
// import { Command } from 'nestjs-command';

@Injectable()
export class DataCommand {
  constructor(private readonly dataService: MockDataService) {}

  // @Command({
  //   command: 'generate:mock-data',
  //   describe: 'Generates mock time-series data for devices',
  // })
  async generateMockData() {
    console.log('Starting mock data generation...');
    await this.dataService.generateMockData();
    console.log('✅ Mock data inserted successfully!');
  }
}
