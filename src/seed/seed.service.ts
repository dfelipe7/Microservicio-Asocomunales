import { OnModuleInit } from '@nestjs/common';
import { MunicipioSeed } from './municipio.seed';
import { AsocomunalSeed } from './asocomunal.seed';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly municipioSeed: MunicipioSeed,
    private readonly asocomunalSeed: AsocomunalSeed,
  ) {}

  async onApplicationBootstrap() {
    await this.run();
  }

  async run() {
    console.log('Iniciando seed...');

    await this.municipioSeed.seed();
    await this.asocomunalSeed.seed();

    console.log('Seed completado');
  }
}