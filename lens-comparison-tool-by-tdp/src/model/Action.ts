import { ActionType } from "constant/other";

export interface Action {
  type: ActionType;
  message?: string;
}
