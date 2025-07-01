import React from "react";
import ConversationItem from "../conversation-item/ConversationItem";
import styles from "./ListConversation.module.css";
import SearchInput from "../search-input/SearchInput";
import ButtonAddConversation from "../button-add-conversation/ButtonAddConversation";

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
  onAddConversation: () => void;
};

export default function ListConversation({
  conversations,
  onSelect,
  onAddConversation,
}: Props) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleSelect = (conv: Conversation) => {
    setSelectedId(conv.id);
    onSelect(conv);
  };

  return (
    <aside className={styles.container}>
      <header className={styles.header}>
        <SearchInput />
        Conversations
      </header>

      {/* Ajoute ici la classe CSS */}
      <div className={styles.buttonAddConversationWrapper}>
        <ButtonAddConversation onClick={onAddConversation} />
      </div>

      <ul className={styles.list}>
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            selected={conv.id === selectedId}
            onClick={() => handleSelect(conv)}
          />
        ))}
      </ul>
    </aside>
  );
}
