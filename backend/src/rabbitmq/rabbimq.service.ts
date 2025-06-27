import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    const rabbitUrl = this.configService.get<string>('RABBITMQ_URL');
    if (!rabbitUrl) {
      throw new Error('RABBITMQ_URL is not defined');
    }

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitUrl],
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