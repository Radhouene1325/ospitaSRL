import { Test, TestingModule } from '@nestjs/testing';
import { UniqueEmailService } from './unique-email.service';

describe('UniqueEmailService', () => {
  let service: UniqueEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueEmailService],
    }).compile();

    service = module.get<UniqueEmailService>(UniqueEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
