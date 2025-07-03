import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chat, Person, Gear, BoxArrowLeft } from "react-bootstrap-icons";
import styles from "./verticalTaskBar.module.css";
import { useApolloClient } from "@apollo/client";

export default function VerticalTaskBar() {
  const [selected, setSelected] = useState<number>(0);
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await client.clearStore();
    navigate("/login");
  };

  const icons = [
    { id: 0, component: <Chat size={20} />, onClick: () => setSelected(0) },
    { id: 1, component: <Person size={20} />, onClick: () => setSelected(1) },
    { id: 2, component: <Gear size={20} />, onClick: () => setSelected(2) },
    { id: 3, component: <BoxArrowLeft size={20} />, onClick: handleLogout },
  ];

  return (
    <section>
      {icons.map(({ id, component, onClick }) => (
        <div
          key={id}
          className={`${styles["section-icon"]} ${
            selected === id ? styles.selected : ""
          } ${id === 3 ? styles.logout : ""}`}
          onClick={onClick}
        >
          {component}
        </div>
      ))}
    </section>
  );
}
