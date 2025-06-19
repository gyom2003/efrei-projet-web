import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('CHAT_SERVICE') private readonly client: ClientProxy) {}

  sendMessage(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }
}
