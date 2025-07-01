import styles from "./ConversationItem.module.css";
import { ArrowRight } from "react-bootstrap-icons";
import type { Conversation } from "../../types";

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
  const last = conversation.messages[conversation.messages.length - 1];

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
          {conversation.participants[1].username}
        </div>

        <div className={styles.lastMessage}>{last.content}</div>
      </div>
      <div className={styles.icon}>
        <ArrowRight />
      </div>
    </li>
  );
}
