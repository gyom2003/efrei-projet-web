import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import { Send } from "react-bootstrap-icons";
import { jwtDecode } from "jwt-decode"; // corrigé import
import styles from "./Chat.module.css";
import {
  GET_CONVERSATION,
  SEND_MESSAGE,
  ON_MESSAGE_SENT,
} from "../../graphql/queries";
import type { Message } from "../../types";

type Props = {
  conversationId: string;
};

type JwtPayload = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

export default function Chat({ conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const token = localStorage.getItem("token");
  let authorId = "";
  let username = "";

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    authorId = decoded.sub;
    username = decoded.username;
  }

  const { data, loading, error } = useQuery(GET_CONVERSATION, {
    variables: { id: conversationId },
    skip: !conversationId,
    fetchPolicy: "network-only",
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data: subscriptionData, error: subscriptionError } = useSubscription(
    ON_MESSAGE_SENT,
    {
      variables: { conversationId },
      skip: !conversationId,
    }
  );

  useEffect(() => {
    if (subscriptionError) {
      console.error("Subscription error:", subscriptionError);
    }
  }, [subscriptionError]);

  // Charger les anciens messages uniquement si messages vide (premier chargement)
  useEffect(() => {
    if (data?.conversation?.messages && messages.length === 0) {
      setMessages(data.conversation.messages);
    }
  }, [data]);

  // Ajouter les nouveaux messages reçus en subscription sans doublon
  useEffect(() => {
    if (subscriptionData?.messageSent) {
      setMessages((prev) => {
        if (prev.some((msg) => msg.id === subscriptionData.messageSent.id)) {
          return prev; // évite doublon
        }
        return [...prev, subscriptionData.messageSent];
      });
    }
  }, [subscriptionData]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    try {
      await sendMessage({
        variables: {
          conversationId,
          authorId,
          content: inputValue.trim(),
        },
      });
      setInputValue("");
    } catch (error) {
      console.error("Erreur envoi message:", error);
    }
  };

  if (!conversationId) {
    return (
      <div className={styles.container}>
        <div className={styles.noMessages}>Sélectionnez une conversation</div>
      </div>
    );
  }

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.messagesWrapper}>
        {messages.length === 0 ? (
          <div className={styles.noMessages}>Aucun message.</div>
        ) : (
          <>
            {messages.map(({ id, author, content, timestamp }) => {
              const isMe = author.username === username;

              return (
                <div
                  key={id}
                  className={`${styles.messageItem} ${
                    isMe ? styles.me : styles.other
                  }`}
                >
                  <div></div>
                  <div className={styles.messageAuthor}>
                    {isMe ? "Moi" : author.username}
                  </div>
                  <div className={styles.messageContent}>{content}</div>
                  <div className={styles.messageTime}>
                    {new Date(timestamp).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </>
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
