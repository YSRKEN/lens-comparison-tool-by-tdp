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

interface Fli {
  id: string;
  name: string;
}

interface Api {
  id: string;
  name: string;
}

interface Image {
  center: string;
  middle: string;
  corner: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const SERVER_URL = 'http://localhost:5000';

const LensDataCard: React.FC<{ lensList: Lens[] }> = ({ lensList }) => {
  const [lensId, setLensId] = useState('');
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [cameraId, setCameraId] = useState('');
  const [fliList, setFliList] = useState<Fli[]>([]);
  const [fliId, setFliId] = useState('');
  const [apiList, setApiList] = useState<Api[]>([]);
  const [apiId, setApiId] = useState('');
  const [image, setImage] = useState<Image>({ center: '', middle: '', corner: '' });


  useEffect(() => {
    if (lensId === '') {
      return;
    }

    const init = async () => {
      setCameraList(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras`)).json());
    };
    init();
  }, [lensId]);

  useEffect(() => {
    if (lensId === '' || cameraId === '') {
      return;
    }

    const init = async () => {
      setFliList(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId}/flies`)).json());
    };
    init();
  }, [lensId, cameraId]);

  useEffect(() => {
    if (lensId === '' || cameraId === '' || fliId === '') {
      return;
    }

    const init = async () => {
      setApiList(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId}/flies/${fliId}/apis`)).json());
    };
    init();
  }, [lensId, cameraId, fliId]);

  useEffect(() => {
    if (lensId === '' || cameraId === '' || fliId === '' || apiId === '') {
      return;
    }

    const init = async () => {
      setImage(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId}/flies/${fliId}/apis/${apiId}/images`)).json());
    };
    init();
  }, [lensId, cameraId, fliId, apiId]);

  useEffect(() => {
    if (cameraList.length > 0 && cameraList.filter(c => c.id === cameraId).length === 0) {
      setCameraId(cameraList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraList]);

  useEffect(() => {
    if (fliList.length > 0 && fliList.filter(c => c.id === fliId).length === 0) {
      setFliId(fliList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fliList]);

  useEffect(() => {
    if (apiList.length > 0 && apiList.filter(c => c.id === apiId).length === 0) {
      setApiId(apiList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiList]);

  const lensList2: SelectOption[] = lensList.map(l => { return { value: l.id, label: l.name } });
  const cameraList2: SelectOption[] = cameraList.map(l => { return { value: l.id, label: l.name } });
  const fliList2: SelectOption[] = fliList.map(l => { return { value: l.id, label: l.name } });
  const apiList2: SelectOption[] = apiList.map(l => { return { value: l.id, label: l.name } });

  const onChangeLens = (e: ValueType<SelectOption>) => {
    if (e !== null && e !== undefined) {
      setLensId((e as SelectOption).value);
    }
  };

  const onChangeCamera = (e: ValueType<SelectOption>) => {
    if (e !== null && e !== undefined) {
      setCameraId((e as SelectOption).value);
    }
  };

  const onChangeFli = (e: ValueType<SelectOption>) => {
    if (e !== null && e !== undefined) {
      setFliId((e as SelectOption).value);
    }
  };

  const onChangeApi = (e: ValueType<SelectOption>) => {
    if (e !== null && e !== undefined) {
      setApiId((e as SelectOption).value);
    }
  };

  return <div className="border w-50">
    <Form className="m-3">
      <Form.Group>
        <Select options={lensList2} placeholder="レンズ名を入力" onChange={onChangeLens} />
        <Select options={cameraList2} placeholder="カメラ名を入力" onChange={onChangeCamera} />
        <Select options={fliList2} placeholder="焦点距離を入力" onChange={onChangeFli} />
        <Select options={apiList2} placeholder="絞り値を入力" onChange={onChangeApi} />
      </Form.Group>
      <Form.Group>
        <img src={image.center} alt="center" style={{ maxWidth: '100%', height: 'auto' }} /><br /><br />
        <img src={image.middle} alt="middle" style={{ maxWidth: '100%', height: 'auto' }} /><br /><br />
        <img src={image.corner} alt="corner" style={{ maxWidth: '100%', height: 'auto' }} />
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
