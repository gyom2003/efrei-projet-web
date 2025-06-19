import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: String!, $content: String!) {
    sendMessage(conversationId: $conversationId, content: $content) {
      conversationId
      content
    }
  }
`;

function SendMessageForm() {
  const [conversationId, setConversationId] = useState("");
  const [content, setContent] = useState("");
  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({ variables: { conversationId, content } });
      alert("Message envoyé !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’envoi du message");
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Conversation ID:</label>
        <input
          value={conversationId}
          onChange={(e) => setConversationId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer"}
      </button>
      {error && <p style={{ color: "red" }}>Erreur: {error.message}</p>}
      {data && (
        <p style={{ color: "green" }}>
          Message envoyé: {data.sendMessage.content}
        </p>
      )}
    </form>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Envoyer un message</h1>
      <SendMessageForm />
    </ApolloProvider>
  );
}
