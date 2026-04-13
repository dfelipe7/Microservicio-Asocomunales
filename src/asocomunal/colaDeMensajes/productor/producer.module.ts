import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';

/**
 * Módulo encargado de la configuración del cliente de RabbitMQ (Productor).
 * 
 * Este módulo exporta el `ProducerService`, el cual será inyectado en los servicios de negocio
 * para enviar mensajes (eventos) a la cola `colaAsocomunales`.
 */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ASOCOMUNAL_PRODUCER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'colaAsocomunales',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule { }
