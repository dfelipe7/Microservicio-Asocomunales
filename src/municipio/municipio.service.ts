import { Injectable } from '@nestjs/common';
import { CreateMunicipioDto } from './dto/request/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/request/update-municipio.dto';
import { MunicipioResponseDto } from './dto/response/municipio-response.dto';

import { NotFoundException } from '@nestjs/common';
import { Municipio } from './entities/municipio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) { }

  async create(
    createMunicipioDto: CreateMunicipioDto,
  ): Promise<MunicipioResponseDto> {
    const municipio = this.municipioRepository.create({
      nombre: createMunicipioDto.nombre,
    });

    const savedMunicipio = await this.municipioRepository.save(municipio);

    return {
      id: savedMunicipio.id,
      nombre: savedMunicipio.nombre,
    };
  }

  async findAll(): Promise<MunicipioResponseDto[]> {
    const municipios = await this.municipioRepository.find({
      where: { isActive: true }, // solo activos
      order: { id: 'ASC' }, // orden por id ascendente
    });

    return municipios.map((m) => ({
      id: m.id,
      nombre: m.nombre,
    }));
  }

  async activate(id: number): Promise<MunicipioResponseDto> {
    const municipio = await this.municipioRepository.findOneBy({ id });
    if (!municipio)
      throw new NotFoundException(`Municipio con id ${id} no encontrado`);

    municipio.isActive = true;
    const updated = await this.municipioRepository.save(municipio);

    return {
      id: updated.id,
      nombre: updated.nombre,
    };
  }

  async findOne(id: number): Promise<MunicipioResponseDto | null> {
    const municipio = await this.municipioRepository.findOneBy({ id });
    if (!municipio) return null;

    return {
      id: municipio.id,
      nombre: municipio.nombre,
    };
  }

  async update(
    id: number,
    updateMunicipioDto: UpdateMunicipioDto,
  ): Promise<MunicipioResponseDto | null> {
    const municipio = await this.municipioRepository.findOneBy({ id });
    if (!municipio) return null;

    Object.assign(municipio, updateMunicipioDto);
    const updatedMunicipio = await this.municipioRepository.save(municipio);

    return {
      id: updatedMunicipio.id,
      nombre: updatedMunicipio.nombre,
    };
  }

  async remove(id: number): Promise<void> {
    const municipio = await this.municipioRepository.findOneBy({ id });
    if (!municipio) {
      throw new NotFoundException(`Municipio con id ${id} no encontrado`);
    }

    // Desactivar en lugar de borrar
    municipio.isActive = false;
    await this.municipioRepository.save(municipio);
  }

  async findByNombre(nombre: string): Promise<Municipio | null> {
    return this.municipioRepository.findOne({
      where: { nombre },
    });
  }
}
