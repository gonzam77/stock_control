import styles from "./newPurchase.module.css";
import NewPurchaseForm from '../../components/forms/createForms/newPurchaseForm/newPurchaseForm';

export default function NewPurchase() {
 
  return (
    <div className={styles.container}>
        <NewPurchaseForm />
    </div>
  );
}
