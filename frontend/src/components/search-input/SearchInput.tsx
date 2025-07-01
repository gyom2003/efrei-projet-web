import { Search } from "react-bootstrap-icons";
import styles from "./searchInput.module.css";

export default function SearchInput() {
  return (
    <form className={styles.searchWrapper} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Rechercher..."
        className={styles.input}
        aria-label="Recherche"
      />
      <button
        type="submit"
        className={styles.iconButton}
        aria-label="Lancer la recherche"
      >
        <Search className={styles.icon} />
      </button>
    </form>
  );
}
