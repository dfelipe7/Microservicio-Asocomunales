import { Test, TestingModule } from '@nestjs/testing';
import { JacController } from './jac.controller';
import { JacService } from './jac.service';

describe('JacController', () => {
  let controller: JacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JacController],
      providers: [JacService],
    }).compile();

    controller = module.get<JacController>(JacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
