import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jac } from './entities/jac.entity';
import { JacEventDto } from './colaDeMensajes/consumidor/dtos/jac-event.dto';
@Injectable()
export class JacService {
  constructor(
    @InjectRepository(Jac)
    private readonly jacRepository: Repository<Jac>,
  ) {}

  async handleEvent(data: JacEventDto) {
    const existing = await this.jacRepository.findOne({
      where: { externalId: data.id },
    });

    switch (data.action) {
      case 'created':
        if (!existing) {
          await this.jacRepository.save(
            this.jacRepository.create({
              externalId: data.id,
              nombre: data.nombre,
              estado: data.estado,
              asocomunalId: data.asocomunalId,
            }),
          );
        }
        break;

      case 'updated':
        if (existing) {
          await this.jacRepository.update(
            { externalId: data.id },
            {
              nombre: data.nombre,
              estado: data.estado,
              asocomunalId: data.asocomunalId,
            },
          );
        }
        break;

      case 'deleted':
        if (existing) {
          await this.jacRepository.update(
            { externalId: data.id },
            { estado: false },
          );
        }
        break;
    }
  }
}
