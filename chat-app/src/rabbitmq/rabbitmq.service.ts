import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('CHAT_SERVICE') private readonly client: ClientProxy) {}

  public sendMessage(pattern: string, data: any) {
    // 'emit' envoie un événement sans attendre de réponse
    this.client.emit(pattern, data);
  }
}