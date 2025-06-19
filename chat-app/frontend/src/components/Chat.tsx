import React from "react";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

type Props = {
  conversationId: string | null;
};

const Messages: Record<string, Message[]> = {
  "1": [
    { id: "m1", sender: "Alice", text: "Salut, comment ça va ?", time: "10:00" },
    { id: "m2", sender: "Moi", text: "Ça va bien, merci !", time: "10:02" },
  ],
  "2": [
    { id: "m3", sender: "Bob", text: "Tu as fini le projet ?", time: "09:30" },
    { id: "m4", sender: "Moi", text: "Presque, je finalise.", time: "09:45" },
  ],
};

export default function Chat({ conversationId }: Props) {
  if (!conversationId) {
    return (
      <div style={{ flex: 1, padding: 20, color: "#666", fontStyle: "italic" }}>
        Sélectionnez une conversation pour voir les messages
      </div>
    );
  }

  const messages = Messages[conversationId] || [];

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
        <div style={{ color: "#666", fontStyle: "italic" }}>Aucun message dans cette conversation.</div>
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
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: 4 }}>{sender}</div>
            <div>{text}</div>
            <div style={{ fontSize: 10, color: "#0000FF", textAlign: "right", marginTop: 4 }}>
              {time}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
