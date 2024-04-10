import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeBrewingToolsService } from './coffee-brewing-tools.service';

describe('CoffeeBrewingToolsService', () => {
  let service: CoffeeBrewingToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeBrewingToolsService],
    }).compile();

    service = module.get<CoffeeBrewingToolsService>(CoffeeBrewingToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
