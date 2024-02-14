import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Roles from "../../components/rolesTable/roles";
import Mesures from "../../components/mesures/mesures";
import Ubications from "../../components/ubications/ubications";
import Brands from '../../components/brands/brands';
import Categories from "../../components/categories/categories";
import PayTypes from "../../components/payTypes/payTypes";
import AccountTypes from '../../components/accountTypes/accountTypes';
import styles from "./nomenclatorsPanel.module.css";

export default function NomenclatorsPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3 bg-info"
        >
          <Tab
            className=""
            eventKey="roles"
            title={<span style={{ color: "black" }}>Tipo de Usuarios</span>}
          >
            <Roles></Roles>
          </Tab>
          <Tab
            className=""
            eventKey="accountType"
            title={<span style={{ color: "black" }}>Tipo de Cuentas</span>}
          >
            <AccountTypes />
          </Tab>
          <Tab
            className=""
            eventKey="brands"
            title={<span style={{ color: "black" }}>Marcas</span>}
          >
            <Brands></Brands>
          </Tab>
          <Tab
            className=""
            eventKey="categories"
            title={<span style={{ color: "black" }}>Categorias</span>}
          >
            <Categories />
          </Tab>
          <Tab
            className=""
            eventKey="mesures"
            title={<span style={{ color: "black" }}>Medidas</span>}
          >
            <Mesures></Mesures>
          </Tab>
          <Tab
            className=""
            eventKey="ubications"
            title={<span style={{ color: "black" }}>Metodos de Pago</span>}
          >
            <PayTypes></PayTypes>
          </Tab>
          <Tab
            className=""
            eventKey="ubications"
            title={<span style={{ color: "black" }}>Ubicaciones</span>}
          >
            <Ubications></Ubications>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
