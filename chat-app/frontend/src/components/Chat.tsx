import { useEffect, useState } from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

type Props = {
  conversationId: string | null;
};

const ON_MESSAGE_SENT = gql`
  subscription OnMessageSent($conversationId: String!) {
    onMessageSent(conversationId: $conversationId) {
      conversationId
      content
      authorId
      timestamp
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: String!, $content: String!) {
    sendMessage(conversationId: $conversationId, content: $content)
  }
`;

export default function Chat({ conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useSubscription(ON_MESSAGE_SENT, {
    variables: { conversationId: conversationId ?? "" },
    skip: !conversationId,
  });

  console.log(conversationId)
  const [sendMessage] = useMutation(SEND_MESSAGE);

  // Dès qu'on reçoit un nouveau message via subscription, on l'ajoute à la liste
  useEffect(() => {
    if (data?.onMessageSent) {
      const msg = data.onMessageSent;
      setMessages((msgs) => [
        ...msgs,
        {
          id: msg.timestamp.toString(),
          sender: msg.authorId,
          text: msg.content,
          time: new Date(msg.timestamp).toLocaleTimeString(),
        },
      ]);
    }
  }, [data]);

  if (!conversationId) {
    return (
      <div style={{ flex: 1, padding: 20, color: "#666", fontStyle: "italic" }}>
        Sélectionnez une conversation pour voir les messages
      </div>
    );
  }

  // Envoyer un message exemple
  const handleSendMessage = async () => {
    const content = prompt("Tape ton message");
    if (content && conversationId) {
      await sendMessage({ variables: { conversationId, content } });
    }
  };

  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      {messages.length === 0 ? (
        <div style={{ color: "#666", fontStyle: "italic" }}>
          Aucun message dans cette conversation.
        </div>
      ) : (
        messages.map(({ id, sender, text, time }) => (
          <div
            key={id}
            style={{
              marginBottom: 12,
              alignSelf: sender === "Moi" ? "flex-end" : "flex-start",
              maxWidth: "70%",
              backgroundColor: sender === "Moi" ? "#0000FF" : "#D3D3D3",
              padding: 10,
              borderRadius: 8,
              boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
              color: sender === "Moi" ? "white" : "black",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: 4 }}>{sender}</div>
            <div>{text}</div>
            <div
              style={{
                fontSize: 10,
                color: "#0000FF",
                textAlign: "right",
                marginTop: 4,
              }}
            >
              {time}
            </div>
          </div>
        ))
      )}
      <button onClick={handleSendMessage}>Envoyer un message</button>
    </div>
  );
}
