import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions'; // pas Redis ici

const pubSub = new PubSub(); // simple PubSub

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async processMessage(data: any) {
    const saved = await this.prisma.message.create({ data });
    await pubSub.publish('message_sent', saved); // si tu veux que l’API s’abonne, passe plutôt par Redis
  }
}
