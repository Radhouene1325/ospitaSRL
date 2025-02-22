import { Test, TestingModule } from '@nestjs/testing';
import { PersoneeService } from './personee.service';

describe('PersoneeService', () => {
  let service: PersoneeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersoneeService],
    }).compile();

    service = module.get<PersoneeService>(PersoneeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
