export const ADD_PAWN = 'ADD_PAWN'
export const ROLL = 'ROLL'
export const SAVE = 'SAVE'
export const SWITCH_PLAYER = 'SWITCH_PLAYER'
export const RESET_ROLL = 'RESET_ROLL'
export const CHANGE_STATE = 'CHANGE_STATE'
export const AVAILABLE_MOVES = 'AVAILABLE_MOVES'
export const MOVE_PAWN = 'MOVE_PAWN'
export const REMOVE_PAWN = 'REMOVE_PAWN'
export const INFO = 'INFO'
export const RESET = 'RESET'

export const addPawn = (player, spot) => {
    return {type: ADD_PAWN, player, spot}
}
export const roll = value => {
    return {type: ROLL, value}
}
export const save = player => {
    return {type: SAVE, player}
}
export const switchPlayer = () => {
    return {type: SWITCH_PLAYER}
}
export const resetRoll = () => {
    return {type: RESET_ROLL}
}
export const changeState = (player, state) => {
    return {type: CHANGE_STATE, player, state}
}
export const setAvailableMoves = (player, moves) => {
    return {type: AVAILABLE_MOVES, player, moves}
}
export const movePawn = (player, from, to) => {
    return {type: MOVE_PAWN, player, from, to}
}
export const removePawn = (player, field) => {
    return {type: REMOVE_PAWN, player, field}
}
export const setInfo = (player, info) => {
    return {type: INFO, player, info}
}
export const reset = () => {
    return {type: RESET}
}
