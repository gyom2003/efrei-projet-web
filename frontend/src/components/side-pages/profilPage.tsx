import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import VerticalTaskBar from "../vertical-task-bar/VerticalTaskBar";
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

type JwtPayload = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

export default function ProfilePage() {
  const token = localStorage.getItem("token");
  const [decoded, setDecoded] = useState<JwtPayload | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setDecoded(decodedToken);
      } catch (err) {
        console.error("Erreur décodage token", err);
      }
    }
  }, [token]);

  const { data, loading } = useQuery(GET_USER, {
    variables: { id: decoded?.sub ?? "" },
    skip: !decoded?.sub,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (loading) return <p className={styles.loading}>Chargement...</p>;

  const user = data?.user;

   return (
    <div className={styles.layout}>
      <VerticalTaskBar />
      <div className={styles.profileContainer}>
        <h1 className={styles.title}>Profil utilisateur</h1>

        {loading && <p className={styles.loading}>Chargement...</p>}

        {user ? (
          <div className={styles.card}>
            <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
            <p><strong>ID :</strong> {user.id}</p>
            <p><strong>Créé le :</strong> {new Date(user.createdAt).toLocaleString()}</p>
          </div>
        ) : decoded ? (
          <div className={styles.card}>
            <p><strong>Nom d'utilisateur (JWT) :</strong> {decoded.username}</p>
            <p><strong>ID (JWT) :</strong> {decoded.sub}</p>
          </div>
        ) : (
          <p className={styles.error}>Aucun utilisateur authentifié.</p>
        )}
      </div>
    </div>
  );
}
