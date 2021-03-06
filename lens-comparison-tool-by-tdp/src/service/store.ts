import { createContext, useEffect, useState } from "react";
import { AppStore } from "model/AppStore";
import { Lens } from 'model/Lens';
import { Action } from "model/Action";
import { Camera } from "model/Camera";
import { Fli } from "model/Fli";
import { Api } from "model/Api";
import { Image } from "model/Image";
import { getData } from "service/http";

export const useAppStore = (): AppStore => {
  const [loadingFlg, setLoadingFlg] = useState(false);
  const [lensList, setLensList] = useState<Lens[]>([]);
  const [lensId, setLensId] = useState('');
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [cameraId, setCameraId] = useState('');
  const [fliList, setFliList] = useState<Fli[]>([]);
  const [fliId, setFliId] = useState('');
  const [apiList, setApiList] = useState<Api[]>([]);
  const [apiId, setApiId] = useState('');
  const [images, setImages] = useState<Image>({
    center: '', middle: '', corner: ''
  });

  useEffect(() => {
    const init = async () => {
      setLoadingFlg(true);
      setLensList(await getData<Lens[]>('/lenses'));
    };
    init();
  }, []);

  useEffect(() => {
    if (lensId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const list = await getData<Camera[]>(`/lenses/${lensId}/cameras`);
        setCameraList(list.map(r => { return { id: `${lensId}-${r.id}`, name: r.name } }));
      };
      init();
    }
  }, [lensId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const cameraId2 = cameraId.split('-')[1];
        const list = await getData<Fli[]>(`/lenses/${lensId}/cameras/${cameraId2}/flies`);
        setFliList(list.map(r => { return { id: `${lensId}-${cameraId2}-${r.id}`, name: r.name } }));
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lensId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const lensId2 = cameraId.split('-')[0];
        const cameraId2 = cameraId.split('-')[1];
        const list = await getData<Fli[]>(`/lenses/${lensId2}/cameras/${cameraId2}/flies`);
        setFliList(list.map(r => { return { id: `${lensId2}-${cameraId2}-${r.id}`, name: r.name } }));
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '' && fliId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const cameraId2 = cameraId.split('-')[1];
        const fliId2 = fliId.split('-')[2];
        const list = await getData<Api[]>(`/lenses/${lensId}/cameras/${cameraId2}/flies/${fliId2}/apis`);
        setApiList(list.map(r => { return { id: `${lensId}-${cameraId2}-${fliId2}-${r.id}`, name: r.name } }));
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lensId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '' && fliId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const lensId2 = cameraId.split('-')[0];
        const cameraId2 = cameraId.split('-')[1];
        const fliId2 = fliId.split('-')[2];
        const list = await getData<Api[]>(`/lenses/${lensId2}/cameras/${cameraId2}/flies/${fliId2}/apis`);
        setApiList(list.map(r => { return { id: `${lensId2}-${cameraId2}-${fliId2}-${r.id}`, name: r.name } }));
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '' && fliId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const lensId2 = fliId.split('-')[0];
        const cameraId2 = fliId.split('-')[1];
        const fliId2 = fliId.split('-')[2];
        const list = await getData<Api[]>(`/lenses/${lensId2}/cameras/${cameraId2}/flies/${fliId2}/apis`);
        setApiList(list.map(r => { return { id: `${lensId2}-${cameraId2}-${fliId2}-${r.id}`, name: r.name } }));
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fliId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '' && fliId !== '' && apiId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const cameraId2 = cameraId.split('-')[1];
        const fliId2 = fliId.split('-')[2];
        const apiId2 = apiId.split('-')[3];
        const temp = await getData<Image>(`/lenses/${lensId}/cameras/${cameraId2}/flies/${fliId2}/apis/${apiId2}/images`);
        setImages(temp);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lensId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '' && fliId !== '' && apiId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const lensId2 = cameraId.split('-')[0];
        const cameraId2 = cameraId.split('-')[1];
        const fliId2 = fliId.split('-')[2];
        const apiId2 = apiId.split('-')[3];
        const temp = await getData<Image>(`/lenses/${lensId2}/cameras/${cameraId2}/flies/${fliId2}/apis/${apiId2}/images`);
        setImages(temp);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '' && fliId !== '' && apiId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const lensId2 = fliId.split('-')[0];
        const cameraId2 = fliId.split('-')[1];
        const fliId2 = fliId.split('-')[2];
        const apiId2 = apiId.split('-')[3];
        const temp = await getData<Image>(`/lenses/${lensId2}/cameras/${cameraId2}/flies/${fliId2}/apis/${apiId2}/images`);
        setImages(temp);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fliId]);

  useEffect(() => {
    if (lensId !== '' && cameraId !== '' && fliId !== '' && apiId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const lensId2 = apiId.split('-')[0];
        const cameraId2 = apiId.split('-')[1];
        const fliId2 = apiId.split('-')[2];
        const apiId2 = apiId.split('-')[3];
        const temp = await getData<Image>(`/lenses/${lensId2}/cameras/${cameraId2}/flies/${fliId2}/apis/${apiId2}/images`);
        setImages(temp);
      };
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiId]);

  useEffect(() => {
    setLoadingFlg(false);
    if (lensList.length > 0 && (lensId === '' || lensList.filter(r => r.id === lensId).length === 0)) {
      setLensId(lensList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lensList]);

  useEffect(() => {
    setLoadingFlg(false);
    if (cameraList.length > 0 && (cameraId === '' || cameraList.filter(r => r.id === cameraId).length === 0)) {
      setCameraId(cameraList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraList]);

  useEffect(() => {
    setLoadingFlg(false);
    if (fliList.length > 0 && (fliId === '' || fliList.filter(r => r.id === fliId).length === 0)) {
      setFliId(fliList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fliList]);

  useEffect(() => {
    setLoadingFlg(false);
    if (apiList.length > 0 && (apiId === '' || apiList.filter(r => r.id === apiId).length === 0)) {
      setApiId(apiList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiList]);

  useEffect(() => {
    setLoadingFlg(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setLensId':
        setLensId(action.message as string);
        break;
      case 'setCameraId':
        setCameraId(action.message as string);
        break;
      case 'setFliId':
        setFliId(action.message as string);
        break;
      case 'setApiId':
        setApiId(action.message as string);
        break;
    }
  };

  return {
    loadingFlg,
    lensList,
    lensId,
    cameraList,
    cameraId,
    fliList,
    fliId,
    apiList,
    apiId,
    images,
    dispatch
  };
};

export const AppContext = createContext<AppStore>({} as AppStore);
