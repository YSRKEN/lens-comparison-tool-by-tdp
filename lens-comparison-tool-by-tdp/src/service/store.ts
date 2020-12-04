import { createContext, useEffect, useState } from "react";
import { AppStore } from "model/AppStore";
import { Lens } from 'model/Lens';
import { SERVER_URL } from "constant/other";
import { Action } from "model/Action";

export const useAppStore = (): AppStore => {
  const [lensList, setLensList] = useState<Lens[]>([]);
  const [lensId, setLensId] = useState('');

  useEffect(() => {
    const init = async () => {
      setLensList(await (await fetch(`${SERVER_URL}/lenses`)).json());
    };
    init();
  }, []);

  useEffect(() => {
    if (lensId === '' && lensList.length > 0 && lensList.filter(l => l.id === lensId).length === 0) {
      setLensId(lensList[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lensList]);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setLensId':
        setLensId(action.message as string);
        break;
    }
  };

  return {
    lensList,
    lensId,
    dispatch
  };
};

export const AppContext = createContext<AppStore>({} as AppStore);
