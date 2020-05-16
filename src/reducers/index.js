import currentReducer from "./current";
import rollReducer from "./roll";
import playersReducer from "./players";
import {combineReducers} from "redux";
import lightReducer from "./light";

const allReducers = combineReducers({
    players: playersReducer,
    current: currentReducer,
    roll: rollReducer,
    light: lightReducer
})
export default allReducers;
