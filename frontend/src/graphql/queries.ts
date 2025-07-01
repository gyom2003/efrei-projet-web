import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($conversationId: String!) {
    messages(conversationId: $conversationId) {
      id
      authorId
      content
      timestamp
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: String!, $content: String!) {
    sendMessage(conversationId: $conversationId, content: $content)
  }
`;

export const ON_MESSAGE_SENT = gql`
  subscription OnMessageSent($conversationId: String!) {
    onMessageSent(conversationId: $conversationId) {
      id
      authorId
      content
      timestamp
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      utilisateur {
        id
        name
        email
        imageUrl
        bio
      }
      messages {
        id
        authorId
        content
        timestamp
      }
    }
  }
`;