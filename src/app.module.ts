import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsocomunalModule } from './asocomunal/asocomunal.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipioModule } from './municipio/municipio.module';
import { SeedModule } from './seed/seed.module';
import { JacModule } from './jac/jac.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'DBAsocomunales',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AsocomunalModule,
    MunicipioModule,
    SeedModule,
    JacModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
