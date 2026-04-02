import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { MunicipioSeed } from './municipio.seed';
import { AsocomunalSeed } from './asocomunal.seed';
import { MunicipioModule } from '../municipio/municipio.module';
import { AsocomunalModule } from '../asocomunal/asocomunal.module';
@Module({
  imports: [MunicipioModule, AsocomunalModule],
  providers: [SeedService, MunicipioSeed, AsocomunalSeed],
})
export class SeedModule {}