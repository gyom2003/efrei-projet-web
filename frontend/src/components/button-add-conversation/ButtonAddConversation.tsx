import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import styles from "./ButtonAddConversation.module.css";
import type { Conversation } from "../../types";

type User = {
  id: string;
  username: string;
};

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

type ButtonAddConversationProps = {
  onAddConversation: (participantIds: string[]) => void;
  currentUserId: string;
  existingConversations: Conversation[];
};

export default function ButtonAddConversation({
  onAddConversation,
  currentUserId,
  existingConversations,
}: ButtonAddConversationProps) {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur lors du chargement des utilisateurs.</p>;

  // Récupérer tous les userId avec qui on a déjà une conversation (autres que moi)
  const usersAlreadyInConversation = new Set(
    existingConversations
      .map((conv) => conv.participants.find((p) => p.id !== currentUserId)?.id)
      .filter(Boolean) as string[]
  );

  // Filtrer les utilisateurs pour enlever ceux déjà en conversation, et ne pas afficher soi-même
  const availableUsers =
    data?.users.filter(
      (user) =>
        user.id !== currentUserId && !usersAlreadyInConversation.has(user.id)
    ) ?? [];

  const handleAddConversation = () => {
    if (!selectedUserId) return alert("Veuillez sélectionner un utilisateur.");
    onAddConversation([currentUserId, selectedUserId]);
  };

  return (
    <div>
      <select
        className={styles.select}
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">-- Choisir un utilisateur --</option>
        {availableUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      <button onClick={handleAddConversation} className={styles.button}>
        Nouvelle conversation <Plus className={styles.icon} />
      </button>
    </div>
  );
}
