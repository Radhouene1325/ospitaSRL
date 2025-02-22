import { Test, TestingModule } from '@nestjs/testing';
import { ServiceModemService } from './service-modem.service';

describe('ServiceModemService', () => {
  let service: ServiceModemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceModemService],
    }).compile();

    service = module.get<ServiceModemService>(ServiceModemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
