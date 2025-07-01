import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from '../../src/message/message.controller';
import { MessageService } from '../../src/message/message.service';
import { mockMessage } from '../mock/mock-message';

describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            processMessage: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  it('devrait appeler processMessage avec les bonnes données', async () => {
    await controller.receptionMessage(mockMessage);

    expect(service.processMessage).toHaveBeenCalledWith(mockMessage);
    expect(service.processMessage).toHaveBeenCalledTimes(1);
  });
});
