import React from "react";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  messages: Message[];
};

type Props = {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
};

export default function ConversationItem({ conversation, selected, onClick }: Props) {
  const last = conversation.messages.at(-1);

  return (
    <li
      onClick={onClick}
      style={{
        padding: 12,
        cursor: "pointer",
        backgroundColor: selected ? "#D3D3D3" : "white",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{conversation.name}</div>

      <div style={{ fontSize: "0.9em", color: "#555" }}>
        {last
          ? `${last.sender === "Moi" ? "Vous: " : ""}${last.text.slice(0, 30)}...`
          : "Aucun message"}
      </div>

      <div style={{ fontSize: "0.8em", color: "#999", textAlign: "right" }}>
        {last?.time || ""}
      </div>
    </li>
  );
}
