import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Select, { ValueType } from 'react-select';


interface Lens {
  id: string;
  name: string;
}

interface Camera {
  id: string;
  name: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const SERVER_URL = 'http://localhost:5000';

const LensDataCard: React.FC<{ lensList: Lens[] }> = ({ lensList }) => {
  const [lensId, setLensId] = useState('');
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [loadingCameraFlg, setLoadingCameraFlg] = useState(false);

  useEffect(() => {
    if (lensId === '') {
      return;
    }

    const init = async () => {
      setCameraList(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras`)).json());
      setLoadingCameraFlg(false);
    };
    init();
  }, [lensId]);

  const lensList2: SelectOption[] = lensList.map(l => { return { value: l.id, label: l.name } });
  const cameraList2: SelectOption[] = cameraList.map(l => { return { value: l.id, label: l.name } });

  const onChangeLens = (e: ValueType<SelectOption>) => {
    if (e !== null && e !== undefined) {
      setLensId((e as SelectOption).value);
      setLoadingCameraFlg(true);
    }
  };

  return <div className="border" style={{ width: '24rem' }}>
    <Form className="m-3">
      <Form.Group>
        <Select options={lensList2} placeholder="レンズ名を入力"
          onChange={onChangeLens} />
        <Select options={cameraList2} placeholder="カメラ名を入力"
          isDisabled={loadingCameraFlg} />
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
