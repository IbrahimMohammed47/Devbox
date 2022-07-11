import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Tool } from 'src/tool/models/tool.entity';
import { Toolbox } from '../models/toolbox.entity';
import { ToolboxService } from '../service/toolbox.service';

@Controller('toolboxes')
export class ToolboxController {
  constructor(private tbxService: ToolboxService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() toolbox: Toolbox, @Request() req): Promise<number> {
    const userId: number = req.user.id;
    toolbox.ownerId = userId;
    return this.tbxService.create(toolbox);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Body() partialTbx: Toolbox, @Param('id') id): Promise<any> {
    return this.tbxService.update(id, partialTbx);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id): Promise<any> {
    return this.tbxService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all_owned')
  findMyToolboxes(@Request() req): Promise<Toolbox[]> {
    const userId: number = req.user.id;
    return this.tbxService.findUserToolboxes(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/add_tool')
  putTool(@Body() tool, @Param('id') id): Promise<any> {
    let tbx = new Toolbox();
    tbx.id = id;
    return this.tbxService.addTool(tbx, tool);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/remove_tool')
  removeTool(@Body() tool, @Param('id') id): Promise<any> {
    let tbx = new Toolbox();
    tbx.id = id;
    return this.tbxService.removeTool(tbx, tool);
  }
}
