import styles from "./newSale.module.css";
import NewSaleForm from '../../components/forms/createForms/newSaleForm/newSaleForm';

export default function NewSale() {
 
  return (
    <div className={styles.container}>
        <NewSaleForm></NewSaleForm>
    </div>
  );
}
