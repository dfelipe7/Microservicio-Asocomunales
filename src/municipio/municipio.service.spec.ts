import { Test, TestingModule } from '@nestjs/testing';
import { MunicipioService } from './municipio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';

describe('MunicipioService', () => {
  let service: MunicipioService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MunicipioService,
        {
          provide: getRepositoryToken(Municipio),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MunicipioService>(MunicipioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
