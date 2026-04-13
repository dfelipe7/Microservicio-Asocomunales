import { Test, TestingModule } from '@nestjs/testing';
import { AsocomunalService } from './asocomunal.service';
import { ASOCOMUNAL_REPOSITORY } from '../accesoDatos/repository/asocomunal-repository.constants';
import { MunicipioService } from 'src/municipio/municipio.service';
import { ProducerService } from '../colaDeMensajes/productor/producer.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAsocomunalDto } from './dto/request/create-asocomunal.dto';

describe('AsocomunalService', () => {
  let service: AsocomunalService;

  // 1. Creamos "Mocks" (funciones falsas) para simular la BD y otros servicios
  const mockAsocomunalRepository = {
    create: jest.fn(),
    findByNombreAndMunicipio: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    activate: jest.fn(),
    findOneWithJacs: jest.fn(),
  };

  const mockMunicipioService = {
    findOne: jest.fn(),
  };

  const mockProducerService = {
    sendAsocomunalEvent: jest.fn(),
  };

  beforeEach(async () => {
    // 2. Configuramos el módulo de pruebas asegurando que inyectamos los mocks
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AsocomunalService,
        {
          provide: ASOCOMUNAL_REPOSITORY,
          useValue: mockAsocomunalRepository,
        },
        {
          provide: MunicipioService,
          useValue: mockMunicipioService,
        },
        {
          provide: ProducerService,
          useValue: mockProducerService,
        },
      ],
    }).compile();

    service = module.get<AsocomunalService>(AsocomunalService);
  });

  // Limpiamos los mocks después de cada prueba para que no interfieran entre sí
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido (instanciar correctamente)', () => {
    expect(service).toBeDefined();
  });

  // 3. Escribimos la suite de pruebas para el método create()
  describe('create()', () => {

    it('debería lanzar BadRequestException si no se envía el nombre', async () => {
      const dto = { municipioId: 1 } as CreateAsocomunalDto;

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      await expect(service.create(dto)).rejects.toThrow('El nombre de la asocomunal es obligatorio');
    });

    it('debería lanzar BadRequestException si no se envía el municipioId', async () => {
      const dto = { nombre: 'AsoCentro' } as CreateAsocomunalDto;

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      await expect(service.create(dto)).rejects.toThrow('El ID del municipio es obligatorio');
    });

    it('debería lanzar BadRequestException si ya existe una asocomunal con ese nombre', async () => {
      const dto: CreateAsocomunalDto = { nombre: 'AsoNorte', municipioId: 2 };

      // Simulamos que la BD responde que SÍ existe
      mockAsocomunalRepository.findByNombreAndMunicipio.mockResolvedValue({ id: 99, nombre: 'AsoNorte' });

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      await expect(service.create(dto)).rejects.toThrow('Ya existe una asocomunal con ese nombre en este municipio');
    });

    it('debería lanzar NotFoundException si el municipio buscado no es encontrado', async () => {
      const dto: CreateAsocomunalDto = { nombre: 'AsoSur', municipioId: 5 };

      // Simulamos que NO existe asocomunal con ese nombre
      mockAsocomunalRepository.findByNombreAndMunicipio.mockResolvedValue(null);
      // Simulamos que el MunicipioService no encuentra el municipio
      mockMunicipioService.findOne.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      await expect(service.create(dto)).rejects.toThrow('Municipio no existe');
    });

    it('debería crear correctamente y emitir el evento a RabbitMQ', async () => {
      const dto: CreateAsocomunalDto = { nombre: 'AsoNueva', municipioId: 1 };

      const municipioFake = { id: 1, nombre: 'Piendamo' };
      const entidadGuardada = {
        id: 10,
        nombre: 'AsoNueva',
        estado: true,
        municipio: { id: 1 }
      };

      // 1. Configuramos cómo deben responder los mocks
      mockAsocomunalRepository.findByNombreAndMunicipio.mockResolvedValue(null);
      mockMunicipioService.findOne.mockResolvedValue(municipioFake);
      mockAsocomunalRepository.create.mockResolvedValue(entidadGuardada);

      // 2. Ejecutamos la función a probar
      const result = await service.create(dto);

      // 3. Verificamos que se haya llamado al repositorio
      expect(mockAsocomunalRepository.create).toHaveBeenCalled();

      // 4. Verificamos que se haya emitido el evento
      expect(mockProducerService.sendAsocomunalEvent).toHaveBeenCalledWith({
        id: 10,
        nombre: 'AsoNueva',
        estado: true,
        municipioId: 1,
        municipioNombre: 'Piendamo',
        action: 'created',
      });

      // 5. Verificamos que devuelva la estructura de respuesta correcta
      expect(result).toBeDefined();
      expect(result.id).toEqual(10);
      expect(result.municipio.nombre).toEqual('Piendamo');
    });
  });

  describe('update()', () => {
    it('debería actualizar asocomunal y emitir evento a RabbitMQ', async () => {
      const dto = { nombre: 'Nueva Aso', municipioId: 1 };
      const asocomunalAntigua = { id: 1, nombre: 'Vieja Aso', estado: true, municipio: { id: 1, nombre: 'Piendamo' } };
      const asocomunalActualizada = { id: 1, nombre: 'Nueva Aso', estado: true, municipio: { id: 1, nombre: 'Piendamo' } };

      mockAsocomunalRepository.findById.mockResolvedValueOnce(asocomunalAntigua).mockResolvedValueOnce(asocomunalActualizada);
      mockAsocomunalRepository.findByNombreAndMunicipio.mockResolvedValue(null);
      mockMunicipioService.findOne.mockResolvedValue({ id: 1, nombre: 'Piendamo' });
      mockAsocomunalRepository.update.mockResolvedValue(undefined);

      const result = await service.update(1, dto);

      expect(mockAsocomunalRepository.update).toHaveBeenCalledWith(1, dto);
      expect(mockProducerService.sendAsocomunalEvent).toHaveBeenCalled();
      expect(result.nombre).toEqual('Nueva Aso');
    });

    it('debería lanzar NotFoundException si no existe asocomunal a editar', async () => {
      mockAsocomunalRepository.findById.mockResolvedValueOnce(null);
      await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll()', () => {
    it('debería retornar un arreglo de asocomunales', async () => {
      mockAsocomunalRepository.findAll.mockResolvedValueOnce([{ id: 1, nombre: 'Aso1' }]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(mockAsocomunalRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('debería retornar una asocomunal si existe', async () => {
      mockAsocomunalRepository.findById.mockResolvedValueOnce({ id: 1, nombre: 'Aso1' });
      const result = await service.findOne(1);
      expect(result.id).toEqual(1);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      mockAsocomunalRepository.findById.mockResolvedValueOnce(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('debería inactivar (borrado lógico) una asocomunal correctamente', async () => {
      mockAsocomunalRepository.findById.mockResolvedValueOnce({ id: 1, estado: true })
                                       .mockResolvedValueOnce({ id: 1, estado: false });
      
      const result = await service.remove(1);
      expect(mockAsocomunalRepository.delete).toHaveBeenCalledWith(1);
      expect(result.estado).toBe(false);
    });
  });

  describe('activate()', () => {
    it('debería activar una asocomunal correctamente', async () => {
      mockAsocomunalRepository.findById.mockResolvedValueOnce({ id: 1, estado: false })
                                       .mockResolvedValueOnce({ id: 1, estado: true });
      
      const result = await service.activate(1);
      expect(mockAsocomunalRepository.activate).toHaveBeenCalledWith(1);
      expect(result.estado).toBe(true);
    });
  });

  describe('getAsocomunalWithJacs()', () => {
    it('debería retornar asocomunal con sus jacs', async () => {
      mockAsocomunalRepository.findOneWithJacs.mockResolvedValueOnce({ id: 1, jacs: [{ id: 10 }] });
      const result = await service.getAsocomunalWithJacs(1);
      expect(result.id).toEqual(1);
      expect(mockAsocomunalRepository.findOneWithJacs).toHaveBeenCalledWith(1);
    });

    it('debería lanzar NotFoundException si no se encuentra', async () => {
      mockAsocomunalRepository.findOneWithJacs.mockResolvedValueOnce(null);
      await expect(service.getAsocomunalWithJacs(99)).rejects.toThrow(NotFoundException);
    });
  });
});
