import styles from './nomenclatorsPanel.module.css'
import Roles from '../../components/rolesTable/roles';


export default function NomenclatorsPanel() {
    console.log('adentro');
    return (
        <div className={styles.container}>
            <div>
                <Roles />
            </div>
        </div>

    )
}