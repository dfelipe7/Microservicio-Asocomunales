import { Asocomunal } from '../entities/asocomunal.entity';

export interface AsocomunalRepository {
  create(asocomunal: Asocomunal): Promise<Asocomunal>;
  findAll(): Promise<Asocomunal[]>;
  findById(id: number): Promise<Asocomunal | null>;
  findByNombre(nombre: string): Promise<Asocomunal | null>;
  findByNombreAndMunicipio(
    nombre: string,
    municipioId: number,
  ): Promise<Asocomunal | null>;
  update(id: number, asocomunal: Partial<Asocomunal>): Promise<void>;
  delete(id: number): Promise<void>;
  activate(id: number): Promise<void>;
  findOneWithJacs(id: number): Promise<Asocomunal | null>;
}
