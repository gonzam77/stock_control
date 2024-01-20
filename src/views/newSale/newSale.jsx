import styles from "./newSale.module.css";
import NewSaleForm from '../../components/forms/createForms/newSale/newSale';

export default function NewSale() {
 
  return (
    <div className={styles.container}>
        <NewSaleForm></NewSaleForm>
    </div>
  );
}
