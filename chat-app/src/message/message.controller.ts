import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class MessageController {

  // ... injecter le service de message, le pubsub...

  @EventPattern('new_message')
  async handleNewMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Received message:`, data);

    // 1. Sauvegarder le message en BDD
    const savedMessage = await this.messageService.saveFinalMessage(data);

    // 2. Publier aux clients via GraphQL Subscription
    pubSub.publish('messageAdded', { messageAdded: savedMessage });

    // 3. Accuser réception du message à RabbitMQ pour qu'il le supprime de la file
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}