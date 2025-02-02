import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDatumDto } from './create-device-datum.dto';

export class UpdateDeviceDatumDto extends PartialType(CreateDeviceDatumDto) {}
