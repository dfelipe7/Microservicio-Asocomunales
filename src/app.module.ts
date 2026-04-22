import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsocomunalModule } from './asocomunal/asocomunal.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipioModule } from './municipio/municipio.module';
import { SeedModule } from './seed/seed.module';
import { JacModule } from './jac/jac.module';
import { AuthModule } from './auth/auth.module';

/**
 * Módulo principal de la aplicación.
 *
 * @returns Módulo principal de la aplicación.
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    AsocomunalModule,
    MunicipioModule,
    SeedModule,
    JacModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
