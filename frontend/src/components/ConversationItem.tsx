import React from "react";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  bio?: string;
};

type Conversation = {
  id: string;
  utilisateur: User;
  messages: Message[];
};

type Props = {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
};

export default function ConversationItem({
  conversation,
  selected,
  onClick,
}: Props) {
  const last = conversation.messages.at(-1);

  return (
    <li
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: "12px 16px",
        backgroundColor: selected ? "#e6f0ff" : "#fff",
        borderBottom: "1px solid #f0f0f0",
        transition: "background-color 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
      onMouseEnter={(e) => {
        if (!selected) e.currentTarget.style.backgroundColor = "#f9f9f9";
      }}
      onMouseLeave={(e) => {
        if (!selected) e.currentTarget.style.backgroundColor = "#fff";
      }}
    >
      {/* Profil image */}
      <img
        src={conversation.utilisateur.imageUrl}
        alt={conversation.utilisateur.name}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 4 }}>
          {conversation.utilisateur.name}
        </div>

        <div
          style={{
            fontSize: "0.9rem",
            color: "#666",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {last
            ? `${last.sender === "Moi" ? "Vous: " : ""}${last.text.slice(0, 50)}`
            : "Aucun message"}
        </div>
      </div>

      {last?.time && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "#aaa",
            marginLeft: 8,
            whiteSpace: "nowrap",
          }}
        >
          {last.time}
        </div>
      )}
    </li>
  );
}
