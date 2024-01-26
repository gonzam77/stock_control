import styles from "./newSetting.module.css";
import NewSettingForm from '../../components/forms/createForms/newSettingForm/newSettingForm';

export default function NewSale() {
 
  return (
    <div className={styles.container}>
        <NewSettingForm />
    </div>
  );
}
