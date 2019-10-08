import { BallState } from "../model/BallState";
import { BallFactory } from "./BallFactory";

export interface StateService {
    updateState(state : BallState) : void;
    resetState(state : BallState) : void;
}