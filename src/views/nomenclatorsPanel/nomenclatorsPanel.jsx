import styles from './nomenclatorsPanel.module.css'
import Roles from '../../components/rolesTable/roles';


export default function NomenclatorsPanel() {
    return (
        <div className={styles.container}>
            <div>
                <Roles />
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    )
}