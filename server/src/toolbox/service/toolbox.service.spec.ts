import { Test, TestingModule } from '@nestjs/testing';
import { ToolboxService } from './toolbox.service';

describe('ToolboxService', () => {
  let service: ToolboxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolboxService],
    }).compile();

    service = module.get<ToolboxService>(ToolboxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
