import { useState } from "react";
import ListConversation from "./list-conversation/ListConversation";
import Chat from "./chat/Chat";
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

// Données initiales simulées
const initialConversations: Conversation[] = [
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
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  // Fonction pour créer une nouvelle conversation avec un id unique
  const createConversation = () => {
    // Exemple d'ID : timestamp string
    const newId = Date.now().toString();

    // Exemple d'utilisateur temporaire
    const newUser: User = {
      id: `user_${newId}`,
      name: "Nouvel utilisateur",
      email: "nouveau@example.com",
      imageUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
      bio: "Bio temporaire",
    };

    const newConversation: Conversation = {
      id: newId,
      utilisateur: newUser,
      messages: [],
    };

    setConversations((prev) => [...prev, newConversation]);
    setSelectedConversation(newConversation); // Sélectionne directement la nouvelle conversation
  };

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ListConversation
          conversations={conversations}
          onSelect={setSelectedConversation}
          onAddConversation={createConversation}
        />
      </div>

      <Chat conversationId={selectedConversation?.id ?? ""} />

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
