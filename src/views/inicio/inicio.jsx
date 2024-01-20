import styles from "./inicio.module.css";
import Sales from '../sales/sales';

export default function Inicio() {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
       
      </div>
      <div>
        <Sales />
      </div>
    </div>
  );
}
