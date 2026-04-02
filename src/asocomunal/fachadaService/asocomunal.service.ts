import { Injectable, Inject } from '@nestjs/common';
import { ASOCOMUNAL_REPOSITORY } from '../accesoDatos/repository/asocomunal-repository.constants';
import type { AsocomunalRepository } from '../accesoDatos/repository/asocomunal-repository';
import { Asocomunal } from '../accesoDatos/entities/asocomunal.entity';
import { CreateAsocomunalDto } from './dto/request/create-asocomunal.dto';
import { UpdateAsocomunalDto } from './dto/request/update-asocomunal.dto';
import { AsocomunalResponseDto } from './dto/response/asocomunal-response.dto';

import { plainToInstance } from 'class-transformer';

import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Municipio } from 'src/municipio/entities/municipio.entity';
import { ProducerService } from '../colaDeMensajes/productor/producer.service';
import { MunicipioService } from 'src/municipio/municipio.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class AsocomunalService {
  constructor(
    @Inject(ASOCOMUNAL_REPOSITORY)
    private readonly asocomunalRepository: AsocomunalRepository,
    private readonly municipioService: MunicipioService,
    private readonly producerService: ProducerService, // <-- inyectamos

  ) {}


async create(dto: CreateAsocomunalDto): Promise<AsocomunalResponseDto> {
  // 1. Validamos que el municipioId exista para evitar el error de 'undefined'
  if (!dto.municipioId) {
    throw new BadRequestException('El ID del municipio es obligatorio');
  }

  // Verificar si ya existe un asocomunal con ese nombre
  const exists = await this.asocomunalRepository.findByNombre(dto.nombre);
  if (exists) {
    return plainToInstance(AsocomunalResponseDto, exists);
  }

  // 2. Buscamos el municipio usando el servicio (obtenemos un DTO)
  const municipioDto = await this.municipioService.findOne(dto.municipioId);

  if (!municipioDto) {
    throw new NotFoundException('Municipio no existe');
  }

  // 3. Crear la entidad
  const entity = new Asocomunal();
  entity.nombre = dto.nombre;
  entity.estado = dto.estado ?? true;

  // 4. Mapeo seguro: Convertimos el DTO a la forma que espera la Entidad
  // Usamos 'as Municipio' para que TS acepte que solo pasamos el ID
  entity.municipio = { id: municipioDto.id } as Municipio;

  // Guardar en la base de datos
  const saved = await this.asocomunalRepository.create(entity);

  // Verificamos que se haya guardado la relación
  if (!saved.municipio) {
    throw new Error('El asocomunal guardado no tiene municipio asignado');
  }

  // Enviar evento
  await this.producerService.sendAsocomunalEvent({
    id: saved.id,
    nombre: saved.nombre,
    estado: saved.estado,
    municipioId: saved.municipio.id,
    action: 'created',
  });

  // 6️⃣ Convertir a DTO de respuesta
  return plainToInstance(AsocomunalResponseDto, saved);
}
  
  
  async findAll(): Promise<AsocomunalResponseDto[]> {
    const entities: Asocomunal[] = await this.asocomunalRepository.findAll();

    // Mapea cada entidad a su DTO de respuesta automáticamente
    return plainToInstance(AsocomunalResponseDto, entities);
  }

  async findOne(id: number): Promise<AsocomunalResponseDto> {
    const entity = await this.asocomunalRepository.findById(id);
    if (!entity) throw new NotFoundException(`Asocomunal con id ${id} no encontrado`);

    return plainToInstance(AsocomunalResponseDto, entity);
  }

  async update(id: number, dto: UpdateAsocomunalDto): Promise<AsocomunalResponseDto> {
    // Verificar que exista
    const entity = await this.asocomunalRepository.findById(id);
    if (!entity) throw new NotFoundException(`Asocomunal con id ${id} no encontrada`);

    // Actualizar en la base de datos
    await this.asocomunalRepository.update(id, dto);

    // Volver a traer la entidad actualizada desde la BD
    const updatedEntity = await this.asocomunalRepository.findById(id);
    if (!updatedEntity) throw new NotFoundException(`Error al actualizar Asocomunal con id ${id}`);

    // Retornar el DTO con los datos exactos que quedaron en la BD
    return plainToInstance(AsocomunalResponseDto, updatedEntity);
  }

  async remove(id: number): Promise<AsocomunalResponseDto> {
    const entity = await this.asocomunalRepository.findById(id);
    if (!entity) throw new NotFoundException(`Asocomunal con id ${id} no encontrada`);

    // Actualizar estado en la BD
    await this.asocomunalRepository.delete(id);

    // Volver a traer la entidad actualizada
    const updatedEntity = await this.asocomunalRepository.findById(id);
    if (!updatedEntity) throw new NotFoundException(`Error al desactivar Asocomunal con id ${id}`);

    return plainToInstance(AsocomunalResponseDto, updatedEntity);
  }

  async activate(id: number): Promise<AsocomunalResponseDto> {
    const entity = await this.asocomunalRepository.findById(id);
    if (!entity) throw new NotFoundException(`Asocomunal con id ${id} no encontrada`);

    // Actualizar estado en la BD
    await this.asocomunalRepository.activate(id);

    // Volver a traer la entidad actualizada
    const updatedEntity = await this.asocomunalRepository.findById(id);
    if (!updatedEntity)
      throw new NotFoundException(`Error al activar Asocomunal con id ${id}`);

    return plainToInstance(AsocomunalResponseDto, updatedEntity);
  }
  /*

   async remove(id: number): Promise<void> {
    return this.asocomunalRepository.delete(id);
  }
   */
 
}