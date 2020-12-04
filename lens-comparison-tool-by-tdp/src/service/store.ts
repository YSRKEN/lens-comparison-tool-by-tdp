import { createContext, useEffect, useState } from "react";
import { AppStore } from "model/AppStore";
import { Lens } from 'model/Lens';
import { SERVER_URL } from "constant/other";
import { Action } from "model/Action";
import { Camera } from "model/Camera";

export const useAppStore = (): AppStore => {
  const [lensList, setLensList] = useState<Lens[]>([]);
  const [lensId, setLensId] = useState('');
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [cameraId, setCameraId] = useState('');

  useEffect(() => {
    const init = async () => {
      setLensList(await (await fetch(`${SERVER_URL}/lenses`)).json());
    };
    init();
  }, []);

  useEffect(() => {
    if (lensId !== '') {
      const init = async () => {
        const list: Camera[] = await (await fetch(`${SERVER_URL}/lenses/${lensId}/cameras`)).json();
        setCameraList(list.map(r => { return { id: `${lensId}-${r.id}`, name: r.name } }));
      };
      init();
    }
  }, [lensId]);

  useEffect(() => {
    if (lensList.length > 0 && (lensId === '' || lensList.filter(r => r.id === lensId).length === 0)) {
      setLensId(lensList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lensList]);

  useEffect(() => {
    if (cameraList.length > 0 && (cameraId === '' || cameraList.filter(r => r.id === cameraId).length === 0)) {
      setCameraId(cameraList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraList]);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setLensId':
        setLensId(action.message as string);
        break;
      case 'setCameraId':
        setCameraId(action.message as string);
        break;
    }
  };

  return {
    lensList,
    lensId,
    cameraList,
    cameraId,
    dispatch
  };
};

export const AppContext = createContext<AppStore>({} as AppStore);
