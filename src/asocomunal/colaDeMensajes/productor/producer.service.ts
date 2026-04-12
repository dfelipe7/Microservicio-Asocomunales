import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AsocomunalEventDto } from './dtos/asocomunal-event.dto';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('ASOCOMUNAL_PRODUCER') private readonly client: ClientProxy,
  ) {}

  sendAsocomunalEvent(event: AsocomunalEventDto) {
    // send envía un mensaje a la cola, con patrón igual a 'asocomunal.event'
    this.client.emit('asocomunal.event', event);
  }
}
