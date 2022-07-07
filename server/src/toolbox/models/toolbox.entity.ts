import { IsBoolean, IsString, Length } from 'class-validator';
import { Tool } from 'src/tool/models/tool.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Toolbox {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(1, 25)
  @Column()
  name: string;

  @IsString()
  @Length(1, 120)
  @Column()
  description: string;

  @IsBoolean()
  @Column({ default: false })
  isPrivate: boolean;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'ownerId' })
  owner: Promise<User>;

  @Column({ type: 'int' }) // you need to specify target relation
  ownerId: number;

  @ManyToMany(() => Tool, {
    cascade: ['insert'],
    // onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'toolbox_tools',
  })
  tools: Tool[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
