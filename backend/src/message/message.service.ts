import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub
  ) {}

  async saveMessage(payload: {
    id: string;
    conversationId: string;
    content: string;
    authorId: string;
    timestamp: number;
  }) {
    return this.prisma.message.create({ data: payload });
  }

  async findMessagesByConversation(conversationId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: 'asc' },
    });
  }

  async processMessage(data: any) {
    const saved = await this.prisma.message.create({ data });
    await this.pubSub.publish('message_sent', saved);
  }
}
