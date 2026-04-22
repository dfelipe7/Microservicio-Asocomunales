import { Module } from '@nestjs/common';
import { JacService } from './jac.service';
import { JacController } from './jac.controller';
import { Jac } from './entities/jac.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JacConsumer } from './colaDeMensajes/consumidor/jac-consumer';
@Module({
  imports: [TypeOrmModule.forFeature([Jac])],
  controllers: [JacController, JacConsumer],
  providers: [JacService, JacConsumer],
})
export class JacModule {}
