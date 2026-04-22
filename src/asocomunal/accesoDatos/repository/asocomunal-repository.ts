import { Asocomunal } from '../entities/asocomunal.entity';

/**
 * Interfaz del repositorio de asocomunales.
 * 
 * Define las operaciones que se pueden realizar sobre las asocomunales.
 */
export interface AsocomunalRepository {

  /**
   * Crea una nueva asocomunal.
   * @param asocomunal - Asocomunal a crear.
   * @returns Asocomunal creada.
   */
  create(asocomunal: Asocomunal): Promise<Asocomunal>;

  /**
   * Obtiene todas las asocomunales.
   * @returns Lista de asocomunales.
   */
  findAll(): Promise<Asocomunal[]>;

  /**
   * Obtiene una asocomunal por ID.
   * @param id - ID de la asocomunal.
   * @returns Asocomunal encontrada.
   */
  findById(id: number): Promise<Asocomunal | null>;

  /**
   * Obtiene una asocomunal por nombre.
   * @param nombre - Nombre de la asocomunal.
   * @returns Asocomunal encontrada.
   */
  findByNombre(nombre: string): Promise<Asocomunal | null>;

  /**
   * Obtiene una asocomunal por nombre y municipio.
   * @param nombre - Nombre de la asocomunal.
   * @param municipioId - ID del municipio.
   * @returns Asocomunal encontrada.
   */
  findByNombreAndMunicipio(
    nombre: string,
    municipioId: number,
  ): Promise<Asocomunal | null>;

  /**
   * Actualiza una asocomunal.
   * @param id - ID de la asocomunal.
   * @param asocomunal - Asocomunal a actualizar.
   * @returns Asocomunal actualizada.
   */
  update(id: number, asocomunal: Partial<Asocomunal>): Promise<void>;

  /**
   * Elimina una asocomunal.
   * @param id - ID de la asocomunal.
   * @returns Asocomunal eliminada.
   */
  delete(id: number): Promise<void>;

  /**
   * Activa una asocomunal.
   * @param id - ID de la asocomunal.
   * @returns Asocomunal activada.
   */
  activate(id: number): Promise<void>;

  /**
   * Obtiene una asocomunal con sus jac.
   * @param id - ID de la asocomunal.
   * @returns Asocomunal encontrada.
   */
  findOneWithJacs(id: number): Promise<Asocomunal | null>;
}
