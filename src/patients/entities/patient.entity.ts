import { IsEmail, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryColumn('uuid')
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

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  address: string;

  @Column({ type: 'varchar', length: 15 })
  @IsString()
  phone_number: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
