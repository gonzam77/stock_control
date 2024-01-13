import styles from './nomenclatorsPanel.module.css'
import Roles from '../../components/nomenclatorsLists/roles';


export default function NomenclatorsPanel() {
    return (
        <div className={styles.container}>
            <Roles />
        </div>
    )
}