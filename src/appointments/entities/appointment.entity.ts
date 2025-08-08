import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'time' })
  hour: string;

  @Column({ type: 'varchar', length: 10 })
  format: string;

  @ManyToOne(() => Doctor, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'doctor' })
  doctor: Doctor;

  @ManyToOne(() => Patient, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'patient' })
  patient: Patient;

  @Column({ type: 'varchar', length: 12 })
  status: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
