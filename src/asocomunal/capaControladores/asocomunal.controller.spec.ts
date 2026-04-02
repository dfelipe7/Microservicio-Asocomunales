import { Test, TestingModule } from '@nestjs/testing';
import { AsocomunalController } from './asocomunal.controller';
import { AsocomunalService } from '../fachadaService/asocomunal.service';

describe('AsocomunalController', () => {
  let controller: AsocomunalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsocomunalController],
      providers: [AsocomunalService],
    }).compile();

    controller = module.get<AsocomunalController>(AsocomunalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
