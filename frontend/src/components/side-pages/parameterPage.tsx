import styles from "./parameterPage.module.css";
import { useTheme } from "../context/ThemeContext";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.title}>Paramètres</h1>
      <div className={styles.option}>
        <label>Mode sombre :</label>
        <button onClick={toggleTheme}>
          {theme === "dark" ? "Désactiver" : "Activer"}
        </button>
      </div>
    </div>
  );
}
