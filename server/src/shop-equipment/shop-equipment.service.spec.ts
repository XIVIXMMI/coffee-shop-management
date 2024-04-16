import { Test, TestingModule } from '@nestjs/testing';
import { ShopEquipmentService } from './shop-equipment.service';

describe('ShopEquipmentService', () => {
  let service: ShopEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopEquipmentService],
    }).compile();

    service = module.get<ShopEquipmentService>(ShopEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
