import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asocomunal } from '../entities/asocomunal.entity';
import { AsocomunalRepository } from './asocomunal-repository';

@Injectable()
export class AsocomunalRepositoryImpl implements AsocomunalRepository {
  constructor(
    @InjectRepository(Asocomunal)
    private readonly repo: Repository<Asocomunal>,
  ) { }

  async create(asocomunal: Asocomunal): Promise<Asocomunal> {
    return this.repo.save(asocomunal);
  }

  async findAll(): Promise<Asocomunal[]> {
    return this.repo.find({
      order: { id: 'ASC' },
      relations: ['municipio'], //Join con municipio para traer el nombre del municipio asociado a cada asocomunal
    });
  }
  async findById(id: number): Promise<Asocomunal | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['municipio'],
    });
  }

  async findByNombre(nombre: string): Promise<Asocomunal | null> {
    return this.repo.findOne({ where: { nombre } });
  }

  async findByNombreAndMunicipio(
    nombre: string,
    municipioId: number,
  ): Promise<Asocomunal | null> {
    return this.repo.findOne({ where: { nombre, municipioId } });
  }

  async update(id: number, asocomunal: Partial<Asocomunal>): Promise<void> {
    await this.repo.update(id, asocomunal); // solo acceso a BD
  }
  /*async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }*/

  async delete(id: number): Promise<void> {
    // Actualiza solo el campo estado a false
    await this.repo.update(id, { estado: false });
  }

  async activate(id: number): Promise<void> {
    await this.repo.update(id, { estado: true });
  }

  async findOneWithJacs(id: number): Promise<Asocomunal | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['jacs', 'municipio'], // Asegúrate de incluir el municipio si quieres el nombre del municipio también
    });
  }
}
