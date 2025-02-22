import { Test, TestingModule } from '@nestjs/testing';
import { HelmetService } from './helmet.service';

describe('HelmetService', () => {
  let service: HelmetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelmetService],
    }).compile();

    service = module.get<HelmetService>(HelmetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
