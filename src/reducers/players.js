import {SAVE, ADD_PAWN, CHANGE_STATE, AVAILABLE_MOVES, MOVE_PAWN, REMOVE_PAWN, INFO, RESET} from "../actions";

export const AWAITS_ROLL = 'AWAITS_ROLL'
export const SELECTS_PAWN = 'SELECTS_PAWN'

const initialState = {
    blue: {
        saved: 0,
        inGame: 0,
        spare: 7,
        info: '',
        state: AWAITS_ROLL,
        moves: [],
        pawns: []
    },
    green: {
        saved: 0,
        inGame: 0,
        spare: 7,
        info: '',
        state: AWAITS_ROLL,
        moves: [],
        pawns: []
    }
}

const playersReducer = (state = initialState, action) => {
    let playerState = {};

    switch (action.type) {
        case ADD_PAWN:
            playerState[action.player] = state[action.player];
            playerState[action.player].pawns.push(action.spot);
            playerState[action.player].spare = state[action.player].spare - 1;
            playerState[action.player].inGame = state[action.player].inGame + 1;
            return Object.assign({}, state, playerState);

        case SAVE:
            playerState[action.player] = state[action.player];
            playerState[action.player].saved = state[action.player].saved + 1;
            playerState[action.player].spare = state[action.player].spare - 2;
            return Object.assign({}, state, playerState);

        case CHANGE_STATE:
            playerState[action.player] = state[action.player];
            playerState[action.player].state = action.state;
            return Object.assign({}, state, playerState);

        case AVAILABLE_MOVES:
            playerState[action.player] = state[action.player];
            playerState[action.player].moves = action.moves;
            return Object.assign({}, state, playerState);

        case MOVE_PAWN:
            playerState[action.player] = state[action.player];
            let replacedPawns = [];
            state[action.player].pawns.forEach(pawn => {
                if (pawn !== action.from) {
                    replacedPawns.push(pawn)
                }
            })
            replacedPawns.push(action.to)
            playerState[action.player].pawns = replacedPawns;
            return Object.assign({}, state, playerState);

        case REMOVE_PAWN:
            playerState[action.player] = state[action.player];
            let reducedPawns = [];
            state[action.player].pawns.forEach(pawn => {
                if (pawn !== action.field) {
                    reducedPawns.push(pawn)
                }
            })
            playerState[action.player].pawns = reducedPawns;
            playerState[action.player].inGame = state[action.player].inGame - 1;
            playerState[action.player].spare = state[action.player].spare + 1;
            return Object.assign({}, state, playerState);

        case INFO:
            playerState[action.player] = state[action.player];
            playerState[action.player].info = action.info;
            return Object.assign({}, state, playerState);

        case RESET:
            return {
                blue: {
                    saved: 0,
                    inGame: 0,
                    spare: 7,
                    info: '',
                    state: AWAITS_ROLL,
                    moves: [],
                    pawns: []
                },
                green: {
                    saved: 0,
                    inGame: 0,
                    spare: 7,
                    info: '',
                    state: AWAITS_ROLL,
                    moves: [],
                    pawns: []
                }
            };

        default:
            return state;
    }
}
export default playersReducer;
