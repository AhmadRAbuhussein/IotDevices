import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { DeviceDatum } from '@device-data/entities/device-datum.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => DeviceDatum, (deviceData) => deviceData.device, {eager: true})
  data: DeviceDatum[];
}
