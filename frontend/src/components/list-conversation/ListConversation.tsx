import React from "react";
import ConversationItem from "../conversation-item/ConversationItem";
import styles from "./ListConversation.module.css";
import SearchInput from "../search-input/SearchInput";
import ButtonAddConversation from "../button-add-conversation/ButtonAddConversation";
import type { Conversation } from "../../types";

type Props = {
  conversations: Conversation[];
  onSelect: (conv: Conversation) => void;
  onAddConversation: (participantIds: string[]) => void;
  currentUserId: string;
};

export default function ListConversation({
  conversations,
  onSelect,
  onAddConversation,
  currentUserId,
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

      <div className={styles.buttonAddConversationWrapper}>
        <ButtonAddConversation
          onAddConversation={onAddConversation}
          currentUserId={currentUserId}
        />
      </div>

      <ul className={styles.list}>
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            selected={conv.id === selectedId}
            onClick={() => handleSelect(conv)}
            currentUserId={currentUserId}
          />
        ))}
      </ul>
    </aside>
  );
}
