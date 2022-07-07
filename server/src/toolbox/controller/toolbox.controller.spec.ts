import { Test, TestingModule } from '@nestjs/testing';
import { ToolboxController } from './toolbox.controller';

describe('ToolboxController', () => {
  let controller: ToolboxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolboxController],
    }).compile();

    controller = module.get<ToolboxController>(ToolboxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
