// ... imports, y compris RabbitMQService

// Dans la méthode sendMessage du resolver
@Mutation(() => Message)
async sendMessage(
  @Args('conversationId') conversationId: string,
  @Args('content') content: string,
): Promise<Message> {
  // Logique pour créer le message (sans le sauvegarder finalement)
  const messagePayload = { conversationId, content, authorId: 'currentUserId' };

  // Publier dans RabbitMQ au lieu de sauvegarder directement
  this.rabbitmqService.sendMessage('new_message', messagePayload);

  // On peut retourner une confirmation immédiate
  return { id: 'temp-id', content, ... };
}