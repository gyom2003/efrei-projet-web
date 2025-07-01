import styles from "./ConversationItem.module.css";
import { ArrowRight } from "react-bootstrap-icons";

type Message = { id: string; sender: string; text: string; time: string };
type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  bio?: string;
};
type Conversation = { id: string; utilisateur: User; messages: Message[] };

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
      <img
        src={conversation.utilisateur.imageUrl}
        alt={conversation.utilisateur.name}
        className={styles.profileImage}
      />

      <div className={styles.content}>
        <div className={styles.name}>{conversation.utilisateur.name}</div>

        <div className={styles.lastMessage}>
          {last
            ? `${last.sender === "Moi" ? "Vous: " : ""}${last.text.slice(
                0,
                50
              )}`
            : "Aucun message"}
        </div>
      </div>
      <div className={styles.icon}>
        <ArrowRight />
      </div>
    </li>
  );
}
