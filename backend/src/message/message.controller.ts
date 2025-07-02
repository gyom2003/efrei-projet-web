import { Inject, Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';

@Controller()
export class MessageController {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @EventPattern('message_send')
  async handleMessage(@Payload() data: any) {
    const { conversationId, authorId, content, timestamp } = data;

    const message = await this.prisma.message.create({
      data: {
        content,
        timestamp,
        conversation: { connect: { id: conversationId } },
        author: { connect: { id: authorId } },
      },
      include: {
        author: true,
        conversation: true,
      },
    });

    console.log('📩 Message reçu et sauvegardé via RabbitMQ');
    await this.pubSub.publish('messageSent', { messageSent: message });
  }
}
