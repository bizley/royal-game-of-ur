import {LIGHT_ON, LIGHT_OFF} from "../actions";

const lightReducer = (state = null, action) => {
    switch (action.type) {
        case LIGHT_ON:
            return {
                player: action.player,
                target: action.target
            };
        case LIGHT_OFF:
            return null;
        default:
            return state;
    }
}
export default lightReducer;
