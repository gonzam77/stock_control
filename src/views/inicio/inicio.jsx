import styles from "./inicio.module.css";
import { Button } from "react-bootstrap";
import Sales from '../sales/sales';
import { Link } from "react-router-dom";

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
