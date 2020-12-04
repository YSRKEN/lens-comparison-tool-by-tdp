import { Action } from "model/Action";
import { Lens } from "model/Lens";

export interface AppStore {
  lensList: Lens[];
  lensId: string;
  dispatch: (action: Action) => void;
}
