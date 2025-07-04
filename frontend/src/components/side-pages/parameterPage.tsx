import styles from "./parameterPage.module.css";
import VerticalTaskBar from "../vertical-task-bar/VerticalTaskBar";

export default function SettingsPage() {
  return (
    <div className={styles.layout}>
      <VerticalTaskBar />
      <div className={styles.settingsContainer}>
        <h1 className={styles.title}>Paramètres</h1>

        <section className={styles.section}>
          <h2>Langue</h2>
          <select className={styles.select} disabled>
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          <p className={styles.note}>Sélection désactivée pour le moment</p>
        </section>

        <section className={styles.section}>
          <h2>Informations sur l'application</h2>
          <ul className={styles.infoList}>
            <li><strong>Version :</strong> 1.0.0</li>
            <li><strong>Licence :</strong> MIT</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
