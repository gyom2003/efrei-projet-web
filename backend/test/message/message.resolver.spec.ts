import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from '../../src/message/message.resolver';
import { MessageService } from '../../src/message/message.service';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from '../../src/prisma/prisma.service';
import { RabbitMQService } from '../../src/rabbitmq/rabbimq.service';

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let messageService: MessageService;
  let rabbitmqService: RabbitMQService;
  let pubSub: PubSub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        {
          provide: MessageService,
          useValue: {
            findByConversation: jest.fn().mockResolvedValue(['msg1', 'msg2']),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: RabbitMQService,
          useValue: {
            sendMessage: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: 'PUB_SUB',
          useValue: {
            asyncIterableIterator: jest.fn().mockReturnValue({
              [Symbol.asyncIterator]() {
                return {
                  next: async () => ({ value: 'mockMessage', done: false }),
                };
              },
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageResolver>(MessageResolver);
    messageService = module.get<MessageService>(MessageService);
    rabbitmqService = module.get<RabbitMQService>(RabbitMQService);
    pubSub = module.get<PubSub>('PUB_SUB');
  });

  it('devrait appeler messageService.findByConversation', async () => {
    const conversationId = 'conv-1';
    const result = await resolver.messages(conversationId);

    expect(messageService.findByConversation).toHaveBeenCalledWith(conversationId);
    expect(result).toEqual(['msg1', 'msg2']);
  });
});
