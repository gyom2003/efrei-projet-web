import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  saveMessage(mockMessage: { id: string; conversationId: string; authorId: string; content: string; timestamp: number; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  findByConversation(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      include: { author: true, conversation: true },
      orderBy: { timestamp: 'asc' },
    });
  }
  

  create(data: {
    conversationId: string;
    authorId: string;
    content: string;
    timestamp: number;
  }) {
    return this.prisma.message.create({ data });
  }
}
