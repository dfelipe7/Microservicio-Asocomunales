import { Test, TestingModule } from '@nestjs/testing';
import { AsocomunalController } from './asocomunal.controller';
import { AsocomunalService } from '../fachadaService/asocomunal.service';

describe('AsocomunalController', () => {
  let controller: AsocomunalController;

  const mockAsocomunalService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsocomunalController],
      providers: [
        {
          provide: AsocomunalService,
          useValue: mockAsocomunalService,
        },
      ],
    }).compile();

    controller = module.get<AsocomunalController>(AsocomunalController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TEST REAL
  it('debería llamar al service.create', async () => {
    const dto = { nombre: 'AsoTest', municipioId: 1 };

    mockAsocomunalService.create.mockResolvedValue({ id: 1 });

    const result = await controller.create(dto);

    expect(mockAsocomunalService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1 });
  });
});