import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asocomunal } from './accesoDatos/entities/asocomunal.entity';
import { AsocomunalService } from './fachadaService/asocomunal.service';
import { AsocomunalController } from './capaControladores/asocomunal.controller';
import { AsocomunalRepositoryImpl } from './accesoDatos/repository/asocomunal-repositoryImpl';
import { ASOCOMUNAL_REPOSITORY } from './accesoDatos/repository/asocomunal-repository.constants';
import { ProducerModule } from './colaDeMensajes/productor/producer.module';
import { MunicipioModule } from 'src/municipio/municipio.module';

/**
 * Módulo principal de la aplicación.
 * 
 * Configura la conexión a la base de datos PostgreSQL, registra los repositorios,
 * define los controladores y servicios, e importa módulos de funcionalidades externas
 * como `MunicipioModule` y `ProducerModule`.
 */
@Module({
  imports: [
    MunicipioModule,
    ProducerModule,
    TypeOrmModule.forFeature([Asocomunal]),
  ],
  controllers: [AsocomunalController],
  providers: [
    AsocomunalService,
    {
      provide: ASOCOMUNAL_REPOSITORY,
      useClass: AsocomunalRepositoryImpl,
    },
  ],
  exports: [ASOCOMUNAL_REPOSITORY, AsocomunalService], // exporta si otro módulo lo necesita
})
export class AsocomunalModule { }
