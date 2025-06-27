import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  ON_MESSAGE_SENT,
} from "../graphql/queries";

type Message = {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
};

type Props = {
  conversationId: string;
};

export default function Chat({ conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Query pour récupérer les anciens messages
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
    skip: !conversationId,
    fetchPolicy: "network-only",
  });

  // Mutation pour envoyer un message
  const [sendMessage] = useMutation(SEND_MESSAGE);

  // Subscription pour recevoir les nouveaux messages
  const { data: subscriptionData } = useSubscription(ON_MESSAGE_SENT, {
    variables: { conversationId },
    skip: !conversationId,
  });

  // Mise à jour de la liste des messages lors du chargement initial
  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  // Ajout des messages reçus par subscription
  useEffect(() => {
    if (subscriptionData?.onMessageSent) {
      setMessages((prev) => [...prev, subscriptionData.onMessageSent]);
    }
  }, [subscriptionData]);

  // Envoi d'un message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    try {
      await sendMessage({
        variables: { conversationId, content: inputValue.trim() },
      });
      setInputValue("");
    } catch (error) {
      console.error("Erreur envoi message:", error);
    }
  };

  if (loading) return <div>Chargement des messages...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

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
          messages.map(({ id, authorId, content, timestamp }) => (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: authorId === "Moi" ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                {authorId === "Moi" ? "Moi" : authorId}
              </div>
              <div
                style={{
                  backgroundColor: authorId === "Moi" ? "#25D366" : "#D3D3D3",
                  padding: "10px 14px",
                  borderRadius: 8,
                  maxWidth: "70%",
                  color: "black",
                  fontSize: 14,
                }}
              >
                {content}
              </div>
              <div
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  color: "#000000",
                  marginTop: 4,
                }}
              >
                {new Date(timestamp).toLocaleTimeString()}
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
