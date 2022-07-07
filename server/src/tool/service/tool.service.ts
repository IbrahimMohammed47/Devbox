import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { FindConditions, getConnection, Like, Repository } from 'typeorm';
import { Tool } from '../models/tool.entity';
import { UserRating } from '../models/userRating.entity';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(Tool) private readonly toolRepo: Repository<Tool>
  ) {}

  async create(tool: Tool): Promise<number> {
    return (await this.toolRepo.save(tool)).id
  }

  async update(toolId: number, tool: Partial<Tool>): Promise<any> {
    let res =  await this.toolRepo.update(toolId, tool);
    if(res.affected < 1){
      throw new NotFoundException("tool not found")
    }
    return "ok"
  }

  async delete(toolId: number): Promise<any> {
    let res =  await this.toolRepo.delete(toolId);
    if(res.affected < 1){
      throw new NotFoundException("tool not found")
    }
    return "ok"
  }

  async get(toolId: number): Promise<any> {
    let res =  await this.toolRepo.findOne(toolId);
    if(!res){
      throw new NotFoundException("tool not found")
    }
    return res
  }

  find(opts: FindConditions<Tool>, take: number, skip: number): Promise<Tool[]> {
    if (opts['name']){
      opts['name']= Like('%' + opts['name'] + '%')
    }
    return this.toolRepo.find({ where: opts, order: { name: "DESC" }, take, skip});
  }

async putRating(toolId: number, postedUserRating: UserRating, rater: User): Promise<any> {
  const queryRunner = await getConnection().createQueryRunner(); 
  try {
    const UserRatingTxRepo = queryRunner.manager.getRepository(UserRating)
    const ToolRxRepo = queryRunner.manager.getRepository(Tool)
    await queryRunner.connect();
    await queryRunner.startTransaction();
        
    let userRating:UserRating = await UserRatingTxRepo.findOne({userId:rater.id, toolId})
    let tool:Tool = await ToolRxRepo.findOne(toolId);
    if(!tool){
      throw new NotFoundException("tool not found")
    }
    if(!userRating){
      userRating = postedUserRating
      userRating.toolId = toolId;
      userRating.userId = rater.id;
      tool.ratings_count += 1;
    } else {
      tool.ratings_sum -= userRating.value;
      userRating.value = postedUserRating.value;
    }
    tool.ratings_sum += postedUserRating.value;

    let p1 = UserRatingTxRepo.save(userRating);
    let p2 = ToolRxRepo.save(tool);
    await Promise.all([p1,p2])
    await queryRunner.commitTransaction();
    return "ok"
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error
  } finally{
    await queryRunner.release()
  }
}
}
