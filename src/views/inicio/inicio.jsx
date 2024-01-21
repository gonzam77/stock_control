import styles from "./inicio.module.css";
import LastSales from '../lastSales/lastSales';

export default function Inicio() {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
      </div>
      <div>
        <LastSales />
      </div>
    </div>
  );
}
