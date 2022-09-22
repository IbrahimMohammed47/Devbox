import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
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

  findOne(opts: FindOptionsWhere<User>): Promise<User> {
    return this.userRepo.findOne({ where: opts });
  }

  findUserTbxs(userId: number): Promise<User> {
    return this.userRepo.findOne({
      select: ['toolboxes'],
      relations: ['toolboxes'],
      where: {
        id:userId,
        toolboxes: {
          isPrivate: false,
        },
      },
    });
  }
}
