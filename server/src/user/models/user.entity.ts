import { UserRating } from 'src/tool/models/userRating.entity';
import { Toolbox } from 'src/toolbox/models/toolbox.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AuthProvider {
  GOOGLE = 'google',
}

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.GOOGLE })
  authProvider: AuthProvider;

  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  userType: UserType;

  @OneToMany(() => Toolbox, (toolbox) => toolbox.owner, {
    cascade: ['remove'],
  })
  toolboxes: Toolbox[];

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
