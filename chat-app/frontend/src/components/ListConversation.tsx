import React from "react";
import ConversationItem from "./ConversationItem";

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
  onSelect: (id: string) => void;
};

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Alice",
    messages: [
      { id: "m1", sender: "Alice", text: "Salut !", time: "12:00" },
      { id: "m2", sender: "Moi", text: "Ça va ?", time: "12:01" },
    ],
  },
  {
    id: "2",
    name: "Bob",
    messages: [],
  },
];

export default function ListConversation({ onSelect }: Props) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <div style={{ width: 300, borderRight: "1px solid #ccc", overflowY: "auto" }}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            selected={conv.id === selectedId}
            onClick={() => handleSelect(conv.id)}
          />
        ))}
      </ul>
    </div>
  );
}
