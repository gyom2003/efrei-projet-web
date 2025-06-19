import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  @EventPattern('message_send')
  handleMessage(@Payload() data: any) {
    this.logger.log(`Message reçu : ${JSON.stringify(data)}`);
    // Sauvegarde BDD + broadcast via GraphQL PubSub (à implémenter plus tard)
  }
}
