import { IsNumber, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateDeviceDatumDto {
  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  @IsOptional()
  temperature?: number;

  @IsNumber()
  @IsOptional()
  humidity?: number;

  @IsNumber()
  @IsOptional()
  pressure?: number;
}