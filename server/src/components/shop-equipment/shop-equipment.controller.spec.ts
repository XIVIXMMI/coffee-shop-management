import { Test, TestingModule } from '@nestjs/testing';
import { ShopEquipmentController } from './shop-equipment.controller';
import { ShopEquipmentService } from './shop-equipment.service';

describe('ShopEquipmentController', () => {
  let controller: ShopEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopEquipmentController],
      providers: [ShopEquipmentService],
    }).compile();

    controller = module.get<ShopEquipmentController>(ShopEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
