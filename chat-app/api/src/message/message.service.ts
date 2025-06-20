// src/message/message.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../worker/src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async saveMessage(payload: {
    id: string;
    conversationId: string;
    content: string;
    authorId: string;
    timestamp: number;
  }) {
    return this.prisma.message.create({ data: payload });
  }
}
