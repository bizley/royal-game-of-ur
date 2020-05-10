import {SWITCH_PLAYER} from "../actions";

const firstPlayer = Math.floor(Math.random() * 2) ? 'blue' : 'green';

const currentReducer = (state = firstPlayer, action) => {
    switch (action.type) {
        case SWITCH_PLAYER:
            return state === 'blue' ? 'green' : 'blue';
        default:
            return state;
    }
}
export default currentReducer;
