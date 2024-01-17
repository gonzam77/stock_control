import styles from './nomenclatorsPanel.module.css'
import Roles from '../../components/rolesTable/roles';
import Mesures from '../../components/mesures/mesures';


export default function NomenclatorsPanel() {
    return (
        <div className={styles.container}>
            <div>
                <Roles />
                <Mesures />
            </div>
            <div>
            </div>
        </div>

    )
}