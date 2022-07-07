import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserRating {
  @PrimaryGeneratedColumn()
  id: number;


  @IsNumber()
  @Min(0.0)
  @Max(5.0)
  @Column('decimal', { scale: 2 })
  public value!: number;

  @Column({ type: 'int' })
  toolId: number;

  @Column({ type: 'int' })
  userId: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
