/**
 * Pruebas de Integración — AsocomunalRepository
 * 
 * Este archivo prueba la conexión real del repositorio con una base de datos.
 * Para no afectar la base de datos de producción (PostgreSQL), se utiliza 
 * una base de datos SQLite en memoria, que se crea vacía al iniciar las
 * pruebas y se destruye al finalizar.
 * 
 * Verificamos que las consultas SQL generadas por TypeORM funcionen correctamente.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AsocomunalRepositoryImpl } from '../src/asocomunal/accesoDatos/repository/asocomunal-repositoryImpl';
import { Asocomunal } from '../src/asocomunal/accesoDatos/entities/asocomunal.entity';
import { Municipio } from '../src/municipio/entities/municipio.entity';
import { Jac } from '../src/jac/entities/jac.entity';

describe('AsocomunalRepository (Integration with DB)', () => {
  let repositoryImpl: AsocomunalRepositoryImpl;
  let ormRepository: Repository<Asocomunal>;
  let municipioRepository: Repository<Municipio>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // Usamos SQLite en memoria
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:', // Base de datos efímera en RAM
          dropSchema: true,
          entities: [Asocomunal, Municipio, Jac],
          synchronize: true, // Crea las tablas automáticamente
        }),
        TypeOrmModule.forFeature([Asocomunal, Municipio, Jac]),
      ],
      providers: [AsocomunalRepositoryImpl],
    }).compile();

    repositoryImpl = moduleFixture.get<AsocomunalRepositoryImpl>(AsocomunalRepositoryImpl);
    ormRepository = moduleFixture.get<Repository<Asocomunal>>(getRepositoryToken(Asocomunal));
    municipioRepository = moduleFixture.get<Repository<Municipio>>(getRepositoryToken(Municipio));
  });

  afterAll(async () => {
    // Cerramos la conexión al terminar
    // moduleFixture.close() se encarga de esto si se captura
  });

  beforeEach(async () => {
    // Limpiamos las tablas antes de cada prueba para evitar colisiones
    await ormRepository.clear();
    await municipioRepository.clear();
  });

  it('Debe guardar una Asocomunal en la base de datos (create)', async () => {
    // Preparar el municipio necesario para la FK
    const municipio = await municipioRepository.save({
      nombre: 'Bogotá',
    });

    const asocomunal = new Asocomunal();
    asocomunal.nombre = 'Asocomunal Central';
    asocomunal.municipioId = municipio.id;
    asocomunal.estado = true;
    asocomunal.presidente = 'Carlos';
    asocomunal.telefono = '12345';
    asocomunal.correo = 'test@test.com';

    // Ejecutar método del repositorio
    const saved = await repositoryImpl.create(asocomunal);

    // Verificar
    expect(saved.id).toBeDefined(); // La BD le asignó un ID
    expect(saved.nombre).toBe('Asocomunal Central');

    // Comprobar leyendo directo de la BD usando TypeORM básico
    const count = await ormRepository.count();
    expect(count).toBe(1);
  });

  it('Debe buscar por ID y traer el municipio asociado (findById)', async () => {
    const municipio = await municipioRepository.save({ nombre: 'Medellín' });
    const asocomunal = await ormRepository.save({
      nombre: 'AsoMedellin',
      municipioId: municipio.id,
      estado: true,
    });

    const result = await repositoryImpl.findById(asocomunal.id);

    expect(result).not.toBeNull();
    expect(result?.nombre).toBe('AsoMedellin');
    expect(result?.municipio).toBeDefined();
    expect(result?.municipio.nombre).toBe('Medellín'); // Verifica el JOIN
  });

  it('Debe hacer borrado lógico (estado = false) (delete)', async () => {
    const municipio = await municipioRepository.save({ nombre: 'Cali' });
    const asocomunal = await ormRepository.save({
      nombre: 'Asocomunal a borrar',
      municipioId: municipio.id,
      estado: true,
    });

    // Eliminamos lógicamente
    await repositoryImpl.delete(asocomunal.id);

    // Verificamos directo en la BD
    const bdItem = await ormRepository.findOne({ where: { id: asocomunal.id } });
    expect(bdItem).toBeDefined();
    expect(bdItem?.estado).toBe(false); // Confirmar que se puso en false, no se borró de la tabla
  });
});
