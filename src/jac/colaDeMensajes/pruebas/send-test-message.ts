import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

async function bootstrap() {
  // Configurar cliente para RabbitMQ
  const client: ClientProxy = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'colaJac', // Debe coincidir con la cola que MS1 escucha
      queueOptions: {
        durable: true,
        autoDelete: false,
      },
    },
  });

  // Conectar cliente
  await client.connect();

  console.log('Simulador MS2 conectado a RabbitMQ');

  // Ejemplos de eventos
  const eventos = [
    {
      id: 1,
      nombre: 'JAC Central',
      estado: true,
      asocomunalId: 1,
      action: 'created',
    },
    {
      id: 2,
      nombre: 'JAC Norte',
      estado: true,
      asocomunalId: 2,
      action: 'created',
    },
    {
      id: 1,
      nombre: 'JAC Central Actualizado',
      estado: true,
      asocomunalId: 1,
      action: 'updated',
    },
    {
      id: 2,
      nombre: 'JAC Norteee',
      estado: false,
      asocomunalId: 3,
      action: 'updated',
    },
     {
      id: 10,
      nombre: 'JAC Sur',
      estado: true,
      asocomunalId: 6,
      action: 'updated',
    },
  ];

  // Enviar los eventos
  for (const evento of eventos) {
    console.log('Enviando evento:', evento);
    client.emit('jac.events', evento); // ms1 escuchará 'jac.events'
  }

  console.log('Todos los eventos simulados enviados.');

  // Cerrar cliente después de un tiempo para asegurar que MS1 reciba
  setTimeout(() => {
    client.close();
    process.exit(0);
  }, 2000);
}

bootstrap();