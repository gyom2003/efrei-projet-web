import React, { useEffect, useState } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: String!, $content: String!) {
    sendMessage(conversationId: $conversationId, content: $content)
  }
`;

const MESSAGE_SENT = gql`
  subscription OnMessageSent($conversationId: String!) {
    onMessageSent(conversationId: $conversationId) {
      id
      conversationId
      content
      authorId
      timestamp
    }
  }
`;

type Message = {
  id: string;
  conversationId: string;
  content: string;
  authorId: string;
  timestamp: number;
};

export default function Chat() {
  const [conversationId] = useState<string>(() => uuidv4()); // Génère un ID unique
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { data } = useSubscription(MESSAGE_SENT, {
    variables: { conversationId },
  });

  // Réception des nouveaux messages via subscription
  useEffect(() => {
    if (data?.onMessageSent) {
      setMessages((prev) => [...prev, data.onMessageSent]);
    }
  }, [data]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    await sendMessage({
      variables: {
        conversationId,
        content: inputValue,
      },
    });

    setInputValue("");
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 20,
        backgroundColor: "#f0f2f5",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ marginBottom: 20 }}>
        Conversation ID : <code>{conversationId}</code>
      </h3>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 12,
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: "#999", fontStyle: "italic" }}>
            Aucun message dans cette conversation.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  msg.authorId === "mock-user" ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                {msg.authorId === "mock-user" ? "Moi" : msg.authorId}
              </div>
              <div
                style={{
                  backgroundColor:
                    msg.authorId === "mock-user" ? "#25D366" : "#D3D3D3",
                  padding: "10px 14px",
                  borderRadius: 8,
                  maxWidth: "70%",
                  color: "black",
                  fontSize: 14,
                }}
              >
                {msg.content}
              </div>
              <div
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  color: "#000000",
                  marginTop: 4,
                }}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Écris un message..."
          style={{
            flex: 1,
            padding: "10px 15px",
            borderRadius: 20,
            border: "1px solid #ccc",
            fontSize: 16,
            outline: "none",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            marginLeft: 8,
            padding: "10px 20px",
            borderRadius: 20,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
