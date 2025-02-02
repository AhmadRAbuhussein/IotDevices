import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
