import { useState } from "react";
import { Chat, Person, Gear, BoxArrowLeft } from "react-bootstrap-icons";
import styles from "./verticalTaskBar.module.css";

export default function VerticalTaskBar() {
  const [selected, setSelected] = useState<number | null>(null);

  const icons = [
    { id: 0, component: <Chat size={20} /> },
    { id: 1, component: <Person size={20} /> },
    { id: 2, component: <Gear size={20} /> },
    { id: 3, component: <BoxArrowLeft size={20} /> },
  ];

  return (
    <section>
      {icons.map(({ id, component }) => (
        <div
          key={id}
          className={`${styles["section-icon"]} ${
            selected === id ? styles.selected : ""
          }`}
          onClick={() => setSelected(id)}
        >
          {component}
        </div>
      ))}
    </section>
  );
}
