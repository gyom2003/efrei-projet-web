import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from '../../src/message/message.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { mockMessage } from '../mock/mock-message';

describe('MessageService', () => {
  let service: MessageService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: PrismaService,
          useValue: {
            message: {
              create: jest.fn().mockResolvedValue(mockMessage),
            },
          },
        },
        {
          provide: 'PUB_SUB',
          useValue: {}, 
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('devrait créer un message', async () => {
    const result = await service.saveMessage(mockMessage);
    expect(prisma.message.create).toHaveBeenCalledWith({
      data: mockMessage,
    });
    expect(result.id).toEqual("uuid-test");
    expect(result.content).toEqual("Bonjour le monde");
    expect(result.authorId).toEqual("user-42");
    expect(result.conversationId).toEqual("conv-1");
    expect(result.timestamp).toEqual(1751064637690);

  });
});
