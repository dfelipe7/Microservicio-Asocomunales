import { Test, TestingModule } from '@nestjs/testing';
import { JacService } from './jac.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Jac } from './entities/jac.entity';

describe('JacService', () => {
  let service: JacService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JacService,
        {
          provide: getRepositoryToken(Jac),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<JacService>(JacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
