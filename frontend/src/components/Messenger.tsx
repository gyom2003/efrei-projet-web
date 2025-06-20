import React, { useState } from "react";
import ListConversation from "./ListConversation";
import Chat from "./Chat";
import Profil from "./Profil";

// Types
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

// Données simulées
const conversations: Conversation[] = [
  {
    id: "1",
    utilisateur: {
      id: "alice",
      name: "Alice Dupont",
      email: "alice@example.com",
      imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "Développeuse passionnée de React",
    },
    messages: [
      { id: "m1", sender: "Alice", text: "Salut !", time: "12:00" },
      { id: "m2", sender: "Moi", text: "Ça va ?", time: "12:01" },
    ],
  },
  {
    id: "2",
    utilisateur: {
      id: "bob",
      name: "Bob Martin",
      email: "bob@example.com",
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      bio: "Designer amateur de minimalisme",
    },
    messages: [],
  },
];

export default function Messenger() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Passe la conversation complète à ListConversation */}
      <ListConversation
        conversations={conversations}
        onSelect={setSelectedConversation}
      />

      {/* Chat affiché seulement si une conversation est sélectionnée */}
      <Chat
        conversationId={selectedConversation?.id ?? null}
        initialMessages={selectedConversation?.messages ?? []}
      />

      {/* Affichage du profil utilisateur */}
      {selectedConversation && (
        <Profil
          name={selectedConversation.utilisateur.name}
          bio={selectedConversation.utilisateur.bio}
          email={selectedConversation.utilisateur.email}
          imageUrl={selectedConversation.utilisateur.imageUrl}
        />
      )}
    </div>
  );
}
