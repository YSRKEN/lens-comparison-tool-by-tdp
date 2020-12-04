import { Action } from "model/Action";
import { Lens } from "model/Lens";
import { Camera } from "model/Camera";

export interface AppStore {
  loadingFlg: boolean;
  lensList: Lens[];
  lensId: string;
  cameraList: Camera[];
  cameraId: string;
  dispatch: (action: Action) => void;
}
