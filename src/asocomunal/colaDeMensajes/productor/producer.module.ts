import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';

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


export class ProducerModule {}