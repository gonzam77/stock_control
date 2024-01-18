import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Roles from '../../components/rolesTable/roles';
import Mesures from '../../components/mesures/mesures';
import Categories from '../../components/categories/categories'

export default function NomenclatorsPanel() {
  return (
    <Tabs
  defaultActiveKey="profile"
  id="uncontrolled-tab-example"
  className="mb-3 bg-info"
>

  <Tab className='' eventKey="roles" title={<span style={{ color: 'black' }}>Roles</span>}>
    <Roles></Roles>
  </Tab>

  <Tab className='' eventKey="mesures" title={<span style={{ color: 'black'  }}>Medidas</span>}>
    <Mesures></Mesures>
  </Tab>

  <Tab className='' eventKey="categories" title={<span style={{ color: 'black'  }}>Categorias</span>}>
    <Categories />
  </Tab>

</Tabs>
  );
}