import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Roles from '../../components/rolesTable/roles';
import Mesures from '../../components/mesures/mesures';

function UncontrolledExample() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Roles">
        <Roles></Roles>
      </Tab>
      <Tab eventKey="profile" title="Medidas">
        <Mesures></Mesures>
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default UncontrolledExample;