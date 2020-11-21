import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Select from 'react-select';


interface Lens {
  id: string;
  name: string;
}

const SERVER_URL = 'http://localhost:5000';

const LensDataCard: React.FC<{ lensList: Lens[] }> = ({ lensList }) => {
  const lensList2 = lensList.map(l => { return { value: l.id, label: l.name } });

  return <div className="border" style={{ width: '24rem' }}>
    <Form className="m-3">
      <Form.Group>
        <Select options={lensList2} placeholder="レンズ名を入力" />
      </Form.Group>
    </Form>
  </div>
};

const App: React.FC = () => {
  const [lensList, setLensList] = useState<Lens[]>([]);

  useEffect(() => {
    const init = async () => {
      setLensList(await (await fetch(`${SERVER_URL}/lenses`)).json());
    };
    init();
  }, []);

  return <Container>
    <Row className="my-3">
      <Col className="text-center">
        <h1>レンズ比較ツール</h1>
      </Col>
    </Row>
    <Row className="my-3">
      <Col>
        <LensDataCard lensList={lensList} />
      </Col>
    </Row>
  </Container>;
}

export default App;
