import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MockDataService } from './mock-data/mock-data.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  // Allows all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allows all standard methods
    allowedHeaders: 'Content-Type, Authorization',  // Allows all standard headers
    credentials: false,  // Disables credentials (cookies or authorization headers)
  });
  const mockDataService = app.get(MockDataService);
  await mockDataService.generateMockData();
  // await app.close();
  await app.listen(4000);
}
bootstrap();
