import { IsEmail, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  @IsString()
  cpf: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 125 })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  password_hash: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  specialties: string;

  @Column({ type: 'varchar', length: 13, unique: true })
  @IsString()
  crm: string;

  @Column({ type: 'varchar', length: 25 })
  @IsString()
  academic_degree: string;

  @Column({ type: 'varchar', length: 9 })
  situation: string;

  @Column({ type: 'time' })
  workday_begin: string;

  @Column({ type: 'time' })
  workday_end: string;

  @Column({ type: 'varchar', length: 15 })
  @IsString()
  phone_number: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  address: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
