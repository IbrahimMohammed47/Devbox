import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Tool } from '../models/tool.entity';
import { UserRating } from '../models/userRating.entity';
import { ToolService } from '../service/tool.service';

// @UseGuards(RolesGuard)
@Controller('tools')
export class ToolController {
  constructor(private toolService: ToolService) {}
  @UseGuards(AuthGuard('jwt'), RoleGuard('admin'))
  @Post()
  create(@Body() tool: Tool): Promise<any> {
    return this.toolService.create(tool)
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard('admin'))
  @Patch(':id')
  update(@Body() partialTool: Tool, @Param('id') id): Promise<any> {
    return this.toolService.update(id, partialTool);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard('admin'))
  @Delete(':id')
  delete(@Param('id') id): Promise<any> {
    return this.toolService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id): Promise<any> {
    return this.toolService.get(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  find(
    @Query('keyword') keyword,
    @Query('category') category,
    @Query('take') take,
    @Query('skip') skip): Promise<any> {
    let opts = {}
    if(keyword) opts['name'] = keyword
    if(category) opts['category'] = category
    take = take || 10
    skip = skip || 0
    return this.toolService.find(opts, take, skip);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/rating')
  rate(@Request() req, @Body() rating: UserRating, @Param('id') id): Promise<any> {
    return this.toolService.putRating(id, rating, req.user)
  }
}
