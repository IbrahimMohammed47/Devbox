import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolController } from './controller/tool.controller';
import { Tool } from './models/tool.entity';
import { UserRating } from './models/userRating.entity';
import { ToolService } from './service/tool.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tool, UserRating])],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
