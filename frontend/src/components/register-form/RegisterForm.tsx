import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: { username, password },
      });
      alert("Utilisateur créé : " + data.createUser.username);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
