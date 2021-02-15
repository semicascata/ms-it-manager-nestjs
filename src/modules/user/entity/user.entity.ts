import { randomBytes } from 'crypto';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role, Occupation } from '../dto/user.dto';
import { argonSalt } from '../../../config/env.config';
import * as argon2 from 'argon2';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column('enum', {
    nullable: false,
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @Column('enum', {
    nullable: true,
    enum: Occupation,
  })
  occupation: Occupation;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // orders: Order;
  // inventory: Inventory;

  @BeforeInsert()
  async hashPassword() {
    const salt = randomBytes(argonSalt);
    this.password = await argon2.hash(this.password, { salt });
  }
}
