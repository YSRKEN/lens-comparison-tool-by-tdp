import React, { createContext, FormEvent, useContext, useEffect, useState } from 'react';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
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

interface AppStore {
  lensList: Lens[];
}

const useAppStore = (): AppStore => {
  const [lensList, setLensList] = useState<Lens[]>([]);

  useEffect(() => {
    const init = async () => {
      setLensList(await (await fetch(`${SERVER_URL}/lenses`)).json());
    };
    init();
  }, []);

  return {
    lensList
  };
};

const AppContext = createContext<AppStore>({} as AppStore);

const SERVER_URL = 'http://localhost:5000';

const LensDataCard: React.FC = () => {
  const { lensList } = useContext(AppContext);

  const [lensId, setLensId] = useState('');
  const [loadingCameraListFlg, setLoadingCameraListFlg] = useState(false);
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [cameraId, setCameraId] = useState('');
  const [loadingFliListFlg, setLoadingFliListFlg] = useState(false);
  const [fliList, setFliList] = useState<Fli[]>([]);
  const [fliId, setFliId] = useState('');
  const [loadingApiListFlg, setLoadingApiListFlg] = useState(false);
  const [apiList, setApiList] = useState<Api[]>([]);
  const [apiId, setApiId] = useState('');
  const [loadingImageFlg, setLoadingImageFlg] = useState(false);
  const [image, setImage] = useState<Image>({ center: '', middle: '', corner: '' });
  const [apiModeFlg, setApiModeFlg] = useState(false);
  const [position, setPosition] = useState('');
  const [loadingImageFlg2, setLoadingImageFlg2] = useState(false);
  const [images, setImages] = useState<{ key: string, data: string }[]>([]);


  useEffect(() => {
    if (lensId === '') {
      return;
    }

    if (!loadingCameraListFlg) {
      setLoadingCameraListFlg(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lensId]);

  useEffect(() => {
    if (loadingCameraListFlg && lensId !== '') {
      const init = async () => {
        setCameraList(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras`)).json());
        setLoadingCameraListFlg(false);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCameraListFlg]);

  useEffect(() => {
    if (cameraId === '') {
      return;
    }

    if (!loadingFliListFlg) {
      setLoadingFliListFlg(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraId]);

  useEffect(() => {
    if (loadingFliListFlg && lensId !== '' && cameraId !== '') {
      const init = async () => {
        setFliList(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId}/flies`)).json());
        setLoadingFliListFlg(false);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFliListFlg]);

  useEffect(() => {
    if (fliId === '') {
      return;
    }

    if (!loadingApiListFlg) {
      setLoadingApiListFlg(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fliId]);

  useEffect(() => {
    if (loadingApiListFlg && lensId !== '' && cameraId !== '' && fliId !== '') {
      const init = async () => {
        setApiList(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId}/flies/${fliId}/apis`)).json());
        setLoadingApiListFlg(false);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingApiListFlg]);

  useEffect(() => {
    if (apiId === '') {
      return;
    }

    if (!loadingImageFlg) {
      setLoadingImageFlg(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId]);

  useEffect(() => {
    if (loadingImageFlg && lensId !== '' && cameraId !== '' && fliId !== '' && apiId !== '') {
      const init = async () => {
        setImage(await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId}/flies/${fliId}/apis/${apiId}/images`)).json());
        setLoadingImageFlg(false);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingImageFlg]);

  useEffect(() => {
    if (position === '') {
      return;
    }

    if (!loadingImageFlg2) {
      setLoadingImageFlg2(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  useEffect(() => {
    if (loadingImageFlg2 && lensId !== '' && cameraId !== '' && fliId !== '' && position !== '') {
      const init = async () => {
        const output: { key: string, data: string }[] = [];
        for (let apiVal of apiList) {
          const data = await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId}/flies/${fliId}/apis/${apiVal.id}/images`)).json();
          output.push({ key: apiVal.name, data: data[position] });
        }
        setImages(output);
        setLoadingImageFlg2(false);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingImageFlg2]);

  useEffect(() => {
    if (cameraList.length > 0) {
      if (cameraList.filter(c => c.id === cameraId).length === 0) {
        setCameraId(cameraList[0].id);
      } else {
        setCameraId(cameraId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraList]);

  useEffect(() => {
    if (fliList.length > 0) {
      if (fliList.filter(c => c.id === fliId).length === 0) {
        setFliId(fliList[0].id);
      } else {
        setFliId(fliId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fliList]);

  useEffect(() => {
    if (apiList.length > 0) {
      if (apiList.filter(c => c.id === apiId).length === 0) {
        setApiId(apiList[0].id);
      } else {
        setApiId(apiId);
      }
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

  const onChangeSpiModeFlg = (e: FormEvent<any>) => setApiModeFlg(flg => !flg);
  const onChangePosition = (e: ValueType<SelectOption>) => {
    if (e !== null && e !== undefined) {
      setPosition((e as SelectOption).value);
    }
  };
  return <div className="border">
    <Form className="m-3">
      <Form.Group>
        <Select options={lensList2} placeholder="レンズ名を入力" onChange={onChangeLens} />
        <Select options={cameraList2} placeholder="カメラ名を入力" onChange={onChangeCamera} />
        <Select options={fliList2} placeholder="焦点距離を入力" onChange={onChangeFli} />
        <Form.Check checked={apiModeFlg} className="m-3" label="絞り値ごとの一覧を表示" onChange={onChangeSpiModeFlg} />
        <Select className={apiModeFlg ? 'd-none' : 'd-block'} options={apiList2} placeholder="絞り値を入力" onChange={onChangeApi} />
        <Select className={apiModeFlg ? 'd-block' : 'd-none'} options={[
          { value: 'center', label: '中央' },
          { value: 'middle', label: '中間' },
          { value: 'corner', label: '周辺' },
        ]} placeholder="表示位置を入力" onChange={onChangePosition} />
      </Form.Group>
      <Form.Group>
        <Alert variant="info" className={loadingCameraListFlg ? 'd-block' : 'd-none'}>カメラ一覧を読み込み中...</Alert>
        <Alert variant="info" className={loadingFliListFlg ? 'd-block' : 'd-none'}>焦点距離一覧を読み込み中...</Alert>
        <Alert variant="info" className={loadingApiListFlg ? 'd-block' : 'd-none'}>絞り値一覧を読み込み中...</Alert>
        <Alert variant="info" className={loadingImageFlg ? 'd-block' : 'd-none'}>画像一覧を読み込み中...</Alert>
        <Alert variant="info" className={loadingImageFlg2 ? 'd-block' : 'd-none'}>画像一覧を読み込み中...</Alert>
      </Form.Group>
      <Form.Group className={apiModeFlg ? 'd-none' : 'd-block'}>
        <img src={image.center} alt="center" style={{ maxWidth: 700, height: 'auto' }} /><br /><br />
        <img src={image.middle} alt="middle" style={{ maxWidth: 700, height: 'auto' }} /><br /><br />
        <img src={image.corner} alt="corner" style={{ maxWidth: 700, height: 'auto' }} />
      </Form.Group>
      <Form.Group className={apiModeFlg ? 'd-block' : 'd-none'}>
        {images.map((pair) => {
          return (<div key={pair.key}>
            <Form.Label><strong>{pair.key}</strong></Form.Label><br />
            <img src={pair.data} alt={pair.key} style={{ maxWidth: 700, height: 'auto' }} />
          </div>);
        })}
      </Form.Group>
    </Form>
  </div>
};

const LensListBox: React.FC = () => {
  const { lensList } = useContext(AppContext);

  return <Form.Group>
    <Form.Label>レンズ名</Form.Label>
    <select className="form-control" size={10}>
      {lensList.length > 0
        ? lensList.map(l => <option key={l.id} value={l.id}>{l.name}</option>)
        : <option>読み込み中...</option>}
    </select>
  </Form.Group>;
}

const LensDataCard2: React.FC = () => {
  return <div className="border">
    <Form className="m-3">
      <LensListBox />
    </Form>
  </div>;
};

const App: React.FC = () => {
  return <Container fluid>
    <Row className="my-3">
      <Col className="text-center">
        <h1>レンズ比較ツール</h1>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="d-flex justify-content-center">
        <AppContext.Provider value={useAppStore()}>
          { /* <LensDataCard /> */}
          { /* <LensDataCard /> */}
          <LensDataCard2 />
        </AppContext.Provider>
      </Col>
    </Row>
  </Container>;
}

export default App;
