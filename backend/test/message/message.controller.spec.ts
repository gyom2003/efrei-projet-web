import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from '../../src/message/message.controller';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';
import { mockMessage } from '../mock/mock-message';

describe('MessageController', () => {
  let controller: MessageController;
  let prisma: PrismaService;
  let pubSub: PubSub;

  beforeEach(async () => {
    const prismaMock = {
      message: {
        create: jest.fn().mockResolvedValue({
          ...mockMessage,
          author: {},
          conversation: {},
        }),
      },
    };

    const pubSubMock = {
      publish: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: PrismaService, useValue: prismaMock },
        { provide: 'PUB_SUB', useValue: pubSubMock },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    prisma = module.get<PrismaService>(PrismaService);
    pubSub = module.get<PubSub>('PUB_SUB');
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  it('devrait appeler prisma.message.create et pubSub.publish', async () => {
    await controller['handleMessage'](mockMessage); // appel direct de la méthode

    expect(prisma.message.create).toHaveBeenCalledWith({
      data: {
        content: mockMessage.content,
        timestamp: mockMessage.timestamp,
        conversation: { connect: { id: mockMessage.conversationId } },
        author: { connect: { id: mockMessage.authorId } },
      },
      include: {
        author: true,
        conversation: true,
      },
    });

    expect(pubSub.publish).toHaveBeenCalledWith('messageSent', {
      messageSent: expect.objectContaining({
        content: mockMessage.content,
      }),
    });
  });
});
