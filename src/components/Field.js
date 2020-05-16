import React from 'react';
import Pawn from "./Pawn";
import {useSelector, useDispatch} from "react-redux";
import {SELECTS_PAWN, AWAITS_ROLL} from '../reducers/players'
import {addPawn, changeState, movePawn, removePawn, resetRoll, save, setInfo, lightOn, lightOff} from "../actions";
import {mapField, mapIndex, nextPlayer, resetGame} from "../App";

const shiftPawn = (dispatch, players, player, from, to) => {
    dispatch(changeState(player, AWAITS_ROLL))

    if (to === 15) {
        dispatch(removePawn(player, from))
        dispatch(save(player))
        if (players[player].saved === 7) {
            if (window.confirm(player.toUpperCase() + ' WINS!\nWould you like to start another game?')) {
                resetGame(dispatch, player)
            }
        } else {
            dispatch(setInfo(player, 'Pawn Saved'))
            nextPlayer(dispatch, player)
        }
    } else {
        const opponent = player === 'blue' ? 'green' : 'blue';
        const pawnsOfOpponent = players[opponent].pawns;
        if (pawnsOfOpponent.includes(mapField(to, player))) {
            dispatch(removePawn(opponent, mapField(to, player)))
            dispatch(setInfo(player, 'Pawn Beaten'))
        }

        dispatch(movePawn(player, from, mapField(to, player)))
        if ([4, 8, 13].includes(to)) {
            dispatch(setInfo(player, 'Special Field|Extra Turn'))
            dispatch(resetRoll())
        } else {
            nextPlayer(dispatch, player)
        }
    }
}

const plusPawn = (dispatch, player, target) => {
    dispatch(changeState(player, AWAITS_ROLL))
    dispatch(addPawn(player, mapField(target, player)))
    if (target === 4) {
        dispatch(setInfo(player, 'Special Field|Extra Turn'))
        dispatch(resetRoll())
    } else {
        nextPlayer(dispatch, player)
    }
}

function Field(props) {
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);
    const currentPlayer = useSelector(state => state.current);
    const light = useSelector(state => state.light);
    const gameStateForCurrent = players[currentPlayer].state;
    const movesForCurrent = players[currentPlayer].moves;
    const movesFlattened = movesForCurrent.map(item => item.field);
    const entryFieldId = currentPlayer === 'blue' ? 'startBlue' : 'startGreen';

    let currentPlayerPawn = null;
    if (!props.content) {
        Object.keys(players).forEach(player => {
            if (players[player].pawns.find(item => item === props.id)) {
                currentPlayerPawn = player;
                return false;
            }
        });
    }

    let content = '';
    let css = props.css;
    let clickable = null;
    let hoverable = null;
    let target = null;
    if (props.content) {
        content = props.content;
        if (gameStateForCurrent === SELECTS_PAWN && movesFlattened.includes(0) && props.id === entryFieldId) {
            css += ' available'
            target = movesForCurrent.find(item => item.field === 0)
            clickable = () => plusPawn(dispatch, currentPlayer, target.target)
            hoverable = () => dispatch(lightOn(currentPlayer, target.target))
        }
    } else if (currentPlayerPawn) {
        content = <Pawn player={currentPlayerPawn}/>;
        const mappedIndex = mapIndex(props.id)
        if (
            gameStateForCurrent === SELECTS_PAWN
            && movesFlattened.includes(mappedIndex)
            && props.id === mapField(mappedIndex, currentPlayer)
        ) {
            css += ' available'
            target = movesForCurrent.find(item => item.field === mapIndex(props.id))
            clickable = () => shiftPawn(dispatch, players, currentPlayer, props.id, target.target)
            hoverable = () => dispatch(lightOn(currentPlayer, target.target))
        }
        if (light && mapField(light.target, light.player) === props.id && currentPlayerPawn !== currentPlayer) {
            css += ' conflict';
        }
    } else if (light && mapField(light.target, light.player) === props.id) {
        css += ' target';
    }

    return (
        <>
            <td
                className={css}
                id={props.id}
                onClick={clickable}
                onMouseOver={hoverable}
                onMouseOut={() => dispatch(lightOff())}>
                {content}
            </td>
        </>
    );
}

export default Field;
