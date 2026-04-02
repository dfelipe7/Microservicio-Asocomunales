import { Test, TestingModule } from '@nestjs/testing';
import { AsocomunalService } from './asocomunal.service';
describe('AsocomunalService', () => {
  let service: AsocomunalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsocomunalService],
    }).compile();

    service = module.get<AsocomunalService>(AsocomunalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
