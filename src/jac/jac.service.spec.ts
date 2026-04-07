import { Test, TestingModule } from '@nestjs/testing';
import { JacService } from './jac.service';

describe('JacService', () => {
  let service: JacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JacService],
    }).compile();

    service = module.get<JacService>(JacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
