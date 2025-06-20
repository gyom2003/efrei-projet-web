// src/rabbitmq/rabbitmq.service.ts
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@localhost:5672'],
        queue: 'message_send',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  sendMessage(pattern: string, data: any) {
    return this.client.emit(pattern, data).toPromise();
  }
}