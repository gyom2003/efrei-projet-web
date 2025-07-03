import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import styles from "./profilPage.module.css";

const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
      createdAt
    }
  }
`;

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
  });

  if (loading) return <p className={styles.loading}>Chargement...</p>;
  if (error || !data?.user) return <p className={styles.error}>Erreur ou utilisateur introuvable</p>;

  const { user } = data;

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Profil utilisateur</h1>
      <div className={styles.card}>
        <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>ID :</strong> {user.id}</p>
        <p><strong>Créé le :</strong> {new Date(user.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
