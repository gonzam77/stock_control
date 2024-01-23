import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import SaleDetail from "../../components/cards/saleDetail/saleDetail";
import styles from "./saleDetail.module.css";

export default function SaleDetailPage() {
    const { id } = useParams();
    //const salesId = parseInt(id)

    const sales = useSelector((state) => state.sales);
    const sale = sales.find((element) => element.id === id);

    return (
        <div classdate={styles.container}>
            <div className={styles.titleContainer}>
                <Link to="/" className={styles.link}>
                    <Button className={styles.backButton} variant="danger">Volver</Button>
                </Link>
            </div>
            <div className={styles.card}>
                <SaleDetail
                    id={sale.id}
                    number={sale.number}
                    items={sale.items}
                    date={sale.date}
                    payType={sale.payType}
                    client={sale.client}
                    deposit={sale.deposit}
                    quantity={sale.quantity}
                />
            </div>
        </div>
    );
}
