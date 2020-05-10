import currentReducer from "./current";
import rollReducer from "./roll";
import playersReducer from "./players";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    players: playersReducer,
    current: currentReducer,
    roll: rollReducer
})
export default allReducers;
