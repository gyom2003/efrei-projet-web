// src/message/message.controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Controller()
export class MessageController {
  @EventPattern('message_send')
  async handleMessage(payload: any) {
    console.log('Message reçu du broker :', payload);
    // Ici tu enregistres en base de données

    // Puis tu publies l'événement pour que les abonnés GraphQL reçoivent le message
    await pubSub.publish('message_sent', payload);
  }
}
