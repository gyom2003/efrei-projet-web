import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from '../../src/message/message.resolver';
import { RabbitMQService } from '../../src/rabbitmq/rabbimq.service';
import { MessageService } from '../../src/message/message.service';
import { mockMessage } from '../mock/mock-message';

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let rabbitmqService: RabbitMQService;
  let messageService: MessageService;

  const mockPubSub = {
    asyncIterator: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        {
          provide: RabbitMQService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
        {
          provide: MessageService,
          useValue: {
            findMessagesByConversation: jest.fn().mockResolvedValue([mockMessage]),
          },
        },
        {
          provide: 'PUB_SUB',
          useValue: mockPubSub,
        },
      ],
    }).compile();

    resolver = module.get<MessageResolver>(MessageResolver);
    rabbitmqService = module.get<RabbitMQService>(RabbitMQService);
    messageService = module.get<MessageService>(MessageService);
  });

  it('devrait être défini', () => {
    expect(resolver).toBeDefined();
  });

  it('devrait retourner pong depuis _ping()', () => {
    expect(resolver._ping()).toBe('pong');
  });

  it('devrait appeler rabbitmqService.sendMessage dans sendMessage()', async () => {
    const conversationId = 'conv-1';
    const content = 'Hello world';

    const result = await resolver.sendMessage(conversationId, content);

    expect(rabbitmqService.sendMessage).toHaveBeenCalledWith(
      'message_send',
      expect.objectContaining({
        conversationId,
        content,
        authorId: 'mock-user',
      }),
    );
    expect(result).toBe(true);
  });

  it('devrait retourner les messages dans getMessages()', async () => {
    const messages = await resolver.getMessages('conv-1');
    expect(messageService.findMessagesByConversation).toHaveBeenCalledWith('conv-1');
    expect(messages).toEqual([mockMessage]);
  });

  it('devrait retourner un itérateur async dans onMessageSent()', () => {
    const result = resolver.onMessageSent('conv-1');
    expect(mockPubSub.asyncIterator).toHaveBeenCalledWith('message_sent');
    expect(result).toEqual({});
  });
});
