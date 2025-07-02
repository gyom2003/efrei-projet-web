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
  mutation SendMessage($conversationId: String!, $authorId: String!, $content: String!) {
  sendMessage(conversationId: $conversationId, authorId: $authorId, content: $content)
}
`;

export const ON_MESSAGE_SENT = gql`
  subscription OnMessageSent($conversationId: String!) {
    messageSent(conversationId: $conversationId) {
      id
      content
      author {
        username
      }
      timestamp
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query conversationsForUser($userId: String!) {
    conversationsForUser(userId: $userId) {
      id
      participants {
        id
        username
      }
      messages {
        id
        content
        timestamp
        author {
          id
          username
        }
      }
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($participantIds: [String!]!) {
    createConversation(participantIds: $participantIds) {
      id
      participants {
        id
        username
      }
      messages {
        id
        content
      }
    }
  }
`;

export const GET_CONVERSATION = gql`
query GetConversation($id: String!) {
  conversation(id: $id) {
    id
    participants {
      id
      username
    }
    messages {
      id
      content
      timestamp
      author {
        id
        username
      }
    }
  }
}
`;