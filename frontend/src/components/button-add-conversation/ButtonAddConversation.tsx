import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import styles from "./ButtonAddConversation.module.css";

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
};

export default function ButtonAddConversation({
  onAddConversation,
  currentUserId,
}: ButtonAddConversationProps) {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur lors du chargement des utilisateurs.</p>;

  // Filtrer pour ne pas afficher l'utilisateur courant
  const users = data?.users.filter((user) => user.id !== currentUserId) ?? [];

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
        {users.map((user) => (
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
