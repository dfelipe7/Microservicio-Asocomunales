import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { JacService } from '../../jac.service';
import { JacEventDto } from './dtos/jac-event.dto';

/**
 * Controlador de eventos de JAC.
 * 
 * Este controlador recibe eventos de JAC desde la cola de mensajes y los procesa
 * a través del servicio de JAC.
 */

@Controller()
export class JacConsumer {
  constructor(private readonly jacService: JacService) { }

  /**
   * Maneja eventos de JAC recibidos desde la cola de mensajes.
   * 
   * @param data - Evento de JAC a procesar.
   */

  @EventPattern('jac.events')
  async handleJacEvent(data: JacEventDto) {
    console.log('Mensaje recibido de MS2:', data);

    await this.jacService.handleEvent(data);
  }
}
