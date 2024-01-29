import styles from "./newTransfer.module.css";
import NewTransferForm from '../../components/forms/createForms/newTransferForm/newTranferForm';

export default function NewTransfer() {
 
  return (
    <div className={styles.container}>
        <NewTransferForm />
    </div>
  );
}
