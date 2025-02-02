import { Device } from 'src/devices/entities/device.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class DeviceDatum {
  @ManyToOne(() => Device, (device) => device.data, { onDelete: 'CASCADE' })
  device: Device;

  @PrimaryColumn({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ type: 'double precision', nullable: true })
  temperature: number;

  @Column({ type: 'double precision', nullable: true })
  humidity: number;

  @Column({ type: 'double precision', nullable: true })
  pressure: number;
}
