import { Test, TestingModule } from '@nestjs/testing';
import { PersonneControllerController } from './personne-controller.controller';

describe('PersonneControllerController', () => {
  let controller: PersonneControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonneControllerController],
    }).compile();

    controller = module.get<PersonneControllerController>(PersonneControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
