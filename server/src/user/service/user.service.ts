import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  create(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(opts: FindConditions<User>): Promise<User> {
    return this.userRepo.findOne({ where: opts });
  }

  findUserTbxs(userId: number): Promise<User> {
    return this.userRepo.findOne(userId, {
      select: ['toolboxes'],
      relations: ['toolboxes'],
      where: {
        toolboxes: {
          isPrivate: false,
        },
      },
    });
  }
}
