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
      .where('tbx.ownerId = :userId', { userId })
      .getMany();
  }

  async addTool(tbx: Toolbox, tool: Tool): Promise<any> {
    await this.tbxRepo
    .createQueryBuilder()
    .relation(Toolbox, "tools")
    .of(tbx)
    .add(tool);
  }

  async removeTool(tbx: Toolbox, tool: Tool): Promise<any> {
    await this.tbxRepo
    .createQueryBuilder()
    .relation(Toolbox, "tools")
    .of(tbx)
    .remove(tool);
  }
  // // doesn't persist (frontend)
  // async clone(tbx: Toolbox, newUserId: number): Promise<Toolbox> {
  //   tbx = await this.tbxRepo.findOne(tbx.id)
  //   let newTbx = { ...tbx };
  //   newTbx.ownerId = newUserId;
  //   newTbx.id = null;
  //   newTbx.createdAt = null;
  //   newTbx.updatedAt = null;
  //   return tbx;
  // }

  // // doesn't persist (frontend)
  // merge(sourceTbx: Toolbox, targetTbx: Toolbox): Toolbox {
  //   let sourceTbxTools: Tool[] = sourceTbx.tools;
  //   let targetTbxTools: Tool[] = targetTbx.tools;
  //   let newTools = sourceTbxTools.filter(
  //     (t) => targetTbxTools.findIndex((t2) => t2.id != t.id) > -1,
  //   );
  //   targetTbx.tools.push(...newTools);
  //   return targetTbx;
  // }
}
