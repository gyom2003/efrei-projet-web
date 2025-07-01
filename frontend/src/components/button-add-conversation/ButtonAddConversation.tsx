import { Plus } from "react-bootstrap-icons";
import styles from "./ButtonAddConversation.module.css";

type ButtonAddConversationProps = {
  onClick: () => void;
};

export default function ButtonAddConversation({
  onClick,
}: ButtonAddConversationProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      Nouvelle conversation
      <Plus className={styles.icon} />
    </button>
  );
}
