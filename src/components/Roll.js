import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {roll, addPawn, resetRoll, changeState, setAvailableMoves, setInfo} from "../actions";
import {AWAITS_ROLL, SELECTS_PAWN} from '../reducers/players'
import {mapField, mapIndex, nextPlayer} from "../App";

const newRoll = (dispatch, players, currentPlayer) => {
    const rollResult = Math.floor(Math.random() * 2)
        + Math.floor(Math.random() * 2)
        + Math.floor(Math.random() * 2)
        + Math.floor(Math.random() * 2);

    dispatch(roll(rollResult))

    if (rollResult === 0) {
        dispatch(setInfo(currentPlayer, 'Losing Turn'))
        nextPlayer(dispatch, currentPlayer)
    } else {
        if (players[currentPlayer].pawns.length === 0) {
            dispatch(addPawn(currentPlayer, mapField(rollResult, currentPlayer)))
            if (rollResult === 4) {
                dispatch(setInfo(currentPlayer, 'Extra Turn'))
                dispatch(resetRoll())
            } else {
                nextPlayer(dispatch, currentPlayer)
            }
        } else {
            analyseBoard(dispatch, rollResult, players, currentPlayer)
        }
    }
}

const mapIndexes = fields => fields.map(value => mapIndex(value))

const analyseBoard = (dispatch, rollResult, players, currentPlayer) => {
    let currentPlayerPawns = mapIndexes(players[currentPlayer].pawns);
    const otherPlayerPawns = mapIndexes(players[currentPlayer === 'blue' ? 'green' : 'blue'].pawns);

    let possibleMoves = [];
    if (players[currentPlayer].spare > players[currentPlayer].pawns.length) {
        currentPlayerPawns.push(0);
    }

    currentPlayerPawns.forEach(value => {
        const targetField = value + rollResult
        if (targetField <= 15) {
            if (!currentPlayerPawns.includes(targetField)) {
                if (targetField !== 8 || (targetField === 8 && !otherPlayerPawns.includes(8))) {
                    possibleMoves.push({
                        field: value,
                        target: targetField
                    })
                }
            }
        }
    })

    if (possibleMoves.length === 0) {
        dispatch(setInfo(currentPlayer, 'No Moves Available'))
        dispatch(changeState(currentPlayer, AWAITS_ROLL))
        nextPlayer(dispatch, currentPlayer)
    } else {
        dispatch(changeState(currentPlayer, SELECTS_PAWN))
        dispatch(setAvailableMoves(currentPlayer, possibleMoves))
    }
}

function Roll() {
    const rollValue = useSelector(state => state.roll);
    const currentPlayer = useSelector(state => state.current);
    const players = useSelector(state => state.players);
    const dispatch = useDispatch();

    return (
        <div>
            {
                rollValue === null
                    ? <button onClick={() => newRoll(dispatch, players, currentPlayer)}>ROLL</button>
                    : ''
            }
            <h1 className="roll">{rollValue}</h1>
        </div>
    );
}

export default Roll;
