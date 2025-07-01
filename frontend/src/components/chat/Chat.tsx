import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { Send } from "react-bootstrap-icons";

import {
  GET_MESSAGES,
  SEND_MESSAGE,
  ON_MESSAGE_SENT,
} from "../../graphql/queries";
import styles from "./Chat.module.css";

type Message = {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
};

type Props = {
  conversationId: string;
};

export default function Chat({ conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Query pour récupérer les anciens messages
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
    skip: !conversationId,
    fetchPolicy: "network-only",
  });

  // Mutation pour envoyer un message
  const [sendMessage] = useMutation(SEND_MESSAGE);

  // Subscription pour recevoir les nouveaux messages
  const { data: subscriptionData } = useSubscription(ON_MESSAGE_SENT, {
    variables: { conversationId },
    skip: !conversationId,
  });

  // Mise à jour de la liste des messages lors du chargement initial
  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  // Ajout des messages reçus par subscription
  useEffect(() => {
    if (subscriptionData?.onMessageSent) {
      setMessages((prev) => [...prev, subscriptionData.onMessageSent]);
    }
  }, [subscriptionData]);

  // Envoi d'un message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    try {
      await sendMessage({
        variables: { conversationId, content: inputValue.trim() },
      });
      setInputValue("");
    } catch (error) {
      console.error("Erreur envoi message:", error);
    }
  };

  if (loading) return <div>Chargement des messages...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.messagesWrapper}>
        {messages.length === 0 ? (
          <div className={styles.noMessages}>
            Aucun message dans cette conversation.
          </div>
        ) : (
          messages.map(({ id, authorId, content, timestamp }) => (
            <div
              key={id}
              className={`${styles.messageItem} ${
                authorId === "Moi" ? styles.me : styles.other
              }`}
            >
              <div className={styles.messageAuthor}>
                {authorId === "Moi" ? "Moi" : authorId}
              </div>
              <div
                className={`${styles.messageContent} ${
                  authorId === "Moi" ? styles.me : styles.other
                }`}
              >
                {content}
              </div>
              <div className={styles.messageTime}>
                {new Date(timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Écris un message..."
          className={styles.inputMessage}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          <Send />
        </button>
      </div>
    </div>
  );
}
