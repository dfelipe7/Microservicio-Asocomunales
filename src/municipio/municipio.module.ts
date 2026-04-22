import { Module } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { MunicipioController } from './municipio.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],

  controllers: [MunicipioController],
  providers: [MunicipioService],
  exports: [MunicipioService], // exporta el servicio para que otros módulos lo puedan usar
})
export class MunicipioModule {}
