// src/message/message.controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';
import { MessageService } from './message.service';
import { PubSubService } from 'src/pubsub/pubsub.service';

const pubSub = new PubSub(); // ou injecte-le en service partagé si besoin

@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly pubSubService: PubSubService, // ✅ injecté
  ) {}

  @EventPattern('message_send')
  async handleMessage(payload: any) {
    console.log('Message reçu du broker :', payload);
    const savedMessage = await this.messageService.saveMessage(payload); 
    console.log('Message sauvegardé :', savedMessage);
    await this.pubSubService.pubSub.publish('message_sent', savedMessage); // ✅ avec id !
  }
}

