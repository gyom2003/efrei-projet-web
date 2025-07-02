import styles from "./ConversationItem.module.css";
import { ArrowRight } from "react-bootstrap-icons";
import type { Conversation } from "../../types";

type Props = {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
  currentUserId: string;
};

export default function ConversationItem({
  conversation,
  selected,
  onClick,
  currentUserId,
}: Props) {
  const otherParticipant = conversation.participants.find(
    (p) => p.id !== currentUserId
  );
  return (
    <li
      onClick={onClick}
      className={`${styles.item} ${selected ? styles.selected : ""}`}
    >
      {/* <img
        alt={conversation.utilisateur.name}
        className={styles.profileImage}
      /> */}

      <div className={styles.content}>
        <div className={styles.name}>
          {otherParticipant?.username || "Utilisateur inconnu"}
        </div>
        <p className={styles.lastMessage}>
          {conversation.messages?.slice(-1)[0]?.content || "Aucun message"}
        </p>
      </div>
      <div className={styles.icon}>
        <ArrowRight />
      </div>
    </li>
  );
}
