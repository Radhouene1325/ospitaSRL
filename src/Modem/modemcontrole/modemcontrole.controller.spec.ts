import { Test, TestingModule } from '@nestjs/testing';
import { ModemcontroleController } from './modemcontrole.controller';

describe('ModemcontroleController', () => {
  let controller: ModemcontroleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModemcontroleController],
    }).compile();

    controller = module.get<ModemcontroleController>(ModemcontroleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
