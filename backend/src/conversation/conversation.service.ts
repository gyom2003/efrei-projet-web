import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.conversation.findMany({
      include: { participants: true, messages: true },
    });
  }

  findOne(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: { participants: true, messages: {
        include: {
          author: true,
        },
      }, },
    });
  }

  create(participantIds: string[]) {
    return this.prisma.conversation.create({
      data: {
        participants: { connect: participantIds.map(id => ({ id })) },
      },
      include: { participants: true, messages: true },
    });
  }

    findByUserId(userId: string) {
        return this.prisma.conversation.findMany({
            where: {
                participants: {
                some: { id: userId },
                },
            },
            include: {
                participants: true,
                messages: {
            include: {
            author: true,
            },
        },
      },
    });
  }
}
