import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolboxController } from './controller/toolbox.controller';
import { Toolbox } from './models/toolbox.entity';
import { ToolboxService } from './service/toolbox.service';

@Module({
  imports: [TypeOrmModule.forFeature([Toolbox])],
  providers: [ToolboxService],
  controllers: [ToolboxController],
})
export class ToolboxModule {}
