import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tool } from 'src/tool/models/tool.entity';
import { Repository } from 'typeorm';
import { Toolbox } from '../models/toolbox.entity';

@Injectable()
export class ToolboxService {
  constructor(
    @InjectRepository(Toolbox) private readonly tbxRepo: Repository<Toolbox>,
  ) {}

  async create(tbx: Toolbox): Promise<number> {
    return (await this.tbxRepo.save(tbx)).id  
  }

  async update(tbxId: number, tbx: Toolbox): Promise<any> {
    let res =  await this.tbxRepo.update(tbxId, tbx);
    if(res.affected < 1){
      throw new NotFoundException("toolbox not found")
    }
    return "ok"
  }

  async delete(tbxId: number): Promise<any> {
    let res =  await this.tbxRepo.delete(tbxId);
    if(res.affected < 1){
      throw new NotFoundException("toolbox not found")
    }
    return "ok"
  }

  findUserToolboxes(userId: number): Promise<Toolbox[]> {
    return this.tbxRepo
      .createQueryBuilder('tbx')
      .leftJoinAndSelect('tbx.tools', 'tool')
      // .leftJoinAndSelect('tool.ratings', 'userRating')
      .where('tbx.ownerId = :userId', { userId })
      // .andWhere(
      //   new Brackets((qb) => {
      //     qb
      //     .where('userRating.userId = :userId', { userId })
      //     .orWhere('userRating.userId IS NULL');
      //   }),
      // ).printSql()
      .getMany();
  }

  addTool(tbx: Toolbox, tool: Tool): Promise<any> {
    tbx.tools.push(tool);
    return this.tbxRepo.save(tbx); // IS THIS EFFECIENT ?
  }

  removeTool(tbx: Toolbox, toolId: number): Promise<any> {
    let toolIndex: number = tbx.tools.findIndex((t) => t.id == toolId);
    tbx.tools.splice(toolIndex, 1);
    return this.tbxRepo.save(tbx); // IS THIS EFFECIENT ?
  }

  // doesn't persist
  clone(tbx: Toolbox, newUserId: number): Toolbox {
    let newTbx = { ...tbx };
    newTbx.ownerId = newUserId;
    newTbx.id = null;
    newTbx.createdAt = null;
    newTbx.updatedAt = null;
    return tbx;
  }

  // doesn't persist
  merge(sourceTbx: Toolbox, targetTbx: Toolbox): Toolbox {
    let sourceTbxTools: Tool[] = sourceTbx.tools;
    let targetTbxTools: Tool[] = targetTbx.tools;
    let newTools = sourceTbxTools.filter(
      (t) => targetTbxTools.findIndex((t2) => t2.id != t.id) > -1,
    );
    targetTbx.tools.push(...newTools);
    return targetTbx;
  }
}
