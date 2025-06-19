import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MessageController {
  @EventPattern('message_send')
  handleMessage(payload: any) {
    console.log('Message reçu du broker :', payload);
    // Enregistrer en DB ici
    // Puis publier via GraphQL PubSub (si intégré)
  }
}
