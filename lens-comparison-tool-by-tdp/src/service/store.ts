import { createContext, useEffect, useState } from "react";
import { AppStore } from "model/AppStore";
import { Lens } from 'model/Lens';
import { SERVER_URL } from "constant/other";
import { Action } from "model/Action";
import { Camera } from "model/Camera";
import { Fli } from "model/Fli";

export const useAppStore = (): AppStore => {
  const [loadingFlg, setLoadingFlg] = useState(false);
  const [lensList, setLensList] = useState<Lens[]>([]);
  const [lensId, setLensId] = useState('');
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [cameraId, setCameraId] = useState('');
  const [fliList, setFliList] = useState<Fli[]>([]);
  const [fliId, setFliId] = useState('');

  useEffect(() => {
    const init = async () => {
      setLoadingFlg(true);
      setLensList(await (await fetch(`${SERVER_URL}/lenses`)).json());
    };
    init();
  }, []);

  useEffect(() => {
    if (lensId !== '') {
      const init = async () => {
        setLoadingFlg(true);
        const list: Camera[] = await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras`)).json();
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
        const list: Fli[] = await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras/${cameraId2}/flies`)).json();
        setFliList(list.map(r => { return { id: `${lensId}-${cameraId2}-${r.id}`, name: r.name } }));
      };
      init();
    }
  }, [lensId, cameraId]);

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
    dispatch
  };
};

export const AppContext = createContext<AppStore>({} as AppStore);
