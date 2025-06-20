import React from "react";
import ConversationItem from "./ConversationItem";

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
  conversations: Conversation[];
  onSelect: (conv: Conversation) => void;
};

export default function ListConversation({ conversations, onSelect }: Props) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleSelect = (conv: Conversation) => {
    setSelectedId(conv.id);
    onSelect(conv);
  };

  return (
    <aside
      style={{
        width: 320,
        borderRight: "1px solid #e0e0e0",
        backgroundColor: "#f5f7fa",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <header
        style={{
          padding: "16px 20px",
          fontWeight: "bold",
          fontSize: "1.2rem",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        Conversations
      </header>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}            // corrige la prop : conversation au singulier
            selected={conv.id === selectedId}
            onClick={() => handleSelect(conv)}
          />
        ))}
      </ul>
    </aside>
  );
}
