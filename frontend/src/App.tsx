import VerticalTaskBar from "./components/vertical-task-bar/VerticalTaskBar.tsx";
import "./App.css";
import ListConversation from "./components/list-conversation/ListConversation.tsx";
import Chat from "./components/chat/Chat.tsx";
import { useEffect, useState } from "react";
import { GET_CONVERSATIONS } from "./graphql/queries";
import { CREATE_CONVERSATION } from "./graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import type { Conversation } from "./types";

type JwtPayload = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const token = localStorage.getItem("token");
  let currentUserId: string | null = null;

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    currentUserId = decoded.sub;
  }

  const { data } = useQuery(GET_CONVERSATIONS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: { userId: currentUserId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.conversationsForUser) {
      setConversations(data.conversationsForUser);
    }
  }, [data]);

  const [createConversationMutation] = useMutation(CREATE_CONVERSATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted(data) {
      setConversations((prev) => [...prev, data.createConversation]);
      setSelectedConversation(data.createConversation);
    },
    onError(error) {
      console.error("Erreur création conversation", error);
    },
  });

  useEffect(() => {
    if (data?.conversations) {
      setConversations(data.conversations);
    }
  }, [data]);

  function createNewConversation(participantIds: string[]) {
    createConversationMutation({ variables: { participantIds } });
  }

  return (
    <main style={{ height: "100vh" }}>
      <VerticalTaskBar />
      <ListConversation
        conversations={conversations}
        onSelect={setSelectedConversation}
        onAddConversation={createNewConversation}
        currentUserId={currentUserId ?? ""}
      />
      <Chat conversationId={selectedConversation?.id ?? ""} />
    </main>
  );
}
