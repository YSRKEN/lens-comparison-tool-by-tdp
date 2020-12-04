import { Action } from "model/Action";
import { Lens } from "model/Lens";
import { Camera } from "model/Camera";
import { Fli } from "model/Fli";

export interface AppStore {
  loadingFlg: boolean;
  lensList: Lens[];
  lensId: string;
  cameraList: Camera[];
  cameraId: string;
  fliList: Fli[];
  fliId: string;
  dispatch: (action: Action) => void;
}
