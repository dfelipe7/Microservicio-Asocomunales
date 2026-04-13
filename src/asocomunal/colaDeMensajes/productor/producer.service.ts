import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AsocomunalEventDto } from './dtos/asocomunal-event.dto';

/**
 * Servicio encargado de enviar eventos a la cola de RabbitMQ.
 * 
 * Utiliza `ClientProxy` para publicar mensajes en el exchange `asocomunal-exchange`
 * con el patrón `asocomunal.event`.
 */
@Injectable()
export class ProducerService {
  constructor(
    /**
     * Cliente proxy para la cola de RabbitMQ.
     * 
     * @Inject('ASOCOMUNAL_PRODUCER') inyecta el cliente proxy configurado en `ProducerModule`.
     */
    @Inject('ASOCOMUNAL_PRODUCER') private readonly client: ClientProxy,
  ) { }

  /**
   * Envía un evento de asocomunal a la cola de RabbitMQ.
   * 
   * @param event - Evento de asocomunal a enviar.
   */
  sendAsocomunalEvent(event: AsocomunalEventDto) {
    // send envía un mensaje a la cola, con patrón igual a 'asocomunal.event'
    this.client.emit('asocomunal.event', event);
  }
}
