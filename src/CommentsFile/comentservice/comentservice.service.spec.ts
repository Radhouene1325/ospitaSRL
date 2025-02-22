import { Test, TestingModule } from '@nestjs/testing';
import { ComentserviceService } from './comentservice.service';

describe('ComentserviceService', () => {
  let service: ComentserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentserviceService],
    }).compile();

    service = module.get<ComentserviceService>(ComentserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
