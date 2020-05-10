import {ROLL, RESET_ROLL} from "../actions";

const rollReducer = (state = null, action) => {
    switch (action.type) {
        case ROLL:
            return action.value;
        case RESET_ROLL:
            return null;
        default:
            return state;
    }
}
export default rollReducer;
