import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeBrewingToolsController } from './coffee-brewing-tools.controller';
import { CoffeeBrewingToolsService } from './coffee-brewing-tools.service';

describe('CoffeeBrewingToolsController', () => {
  let controller: CoffeeBrewingToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeBrewingToolsController],
      providers: [CoffeeBrewingToolsService],
    }).compile();

    controller = module.get<CoffeeBrewingToolsController>(CoffeeBrewingToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
