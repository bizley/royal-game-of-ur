import React, {Fragment} from 'react';
import './ur.css';
import Roll from "./components/Roll";
import Field from "./components/Field";
import {useSelector} from "react-redux";
import {reset, resetRoll, setInfo, switchPlayer} from "./actions";

export const mapIndex = field => Math.abs(parseInt(field.substring(1)));
export const mapField = (index, player) => {
    if (index < 5 || index > 12) {
        index = player === 'blue' ? index : -index
    }
    return 'c' + index;
}
export const otherPlayer = player => player === 'blue' ? 'green' : 'blue'
export const nextPlayer = (dispatch, current) => {
    dispatch(switchPlayer())
    dispatch(setInfo(otherPlayer(current), ''))
    dispatch(resetRoll())
}
export const resetGame = (dispatch, current) => {
    dispatch(reset())
    dispatch(setInfo(current, ''))
    dispatch(setInfo(otherPlayer(current), ''))
    dispatch(resetRoll())
}

function App() {
    const current = useSelector(state => state.current)
    const players = useSelector(state => state.players)
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td className={'score' + (current === 'blue' ? ' current' : '')} rowSpan="8">
                        <h1>BLUE</h1>
                        <h2>SPARE: {players.blue.spare}</h2>
                        <h2>IN GAME: {players.blue.inGame}</h2>
                        <h2>SAVED: {players.blue.saved}</h2>
                        {current === 'blue' ? <Roll/> : ''}
                        <h3>{players.blue.info.split('|').map((item, key) => {
                            return <Fragment key={key}>{item}<br/></Fragment>
                        })}</h3>
                    </td>
                    <Field css="blue extra" id="c4" />
                    <Field id="c5" />
                    <Field css="green extra" id="c-4" />
                    <td className={'score' + (current === 'green' ? ' current' : '')} rowSpan="8">
                        <h1>GREEN</h1>
                        <h2>SPARE: {players.green.spare}</h2>
                        <h2>IN GAME: {players.green.inGame}</h2>
                        <h2>SAVED: {players.green.saved}</h2>
                        {current === 'green' ? <Roll/> : ''}
                        <h3>{players.green.info.split('|').map((item, key) => {
                            return <Fragment key={key}>{item}<br/></Fragment>
                        })}</h3>
                    </td>
                </tr>
                <tr>
                    <Field css="blue" id="c3" />
                    <Field id="c6" />
                    <Field css="green" id="c-3" />
                </tr>
                <tr>
                    <Field css="blue" id="c2" />
                    <Field id="c7" />
                    <Field css="green" id="c-2" />
                </tr>
                <tr>
                    <Field css="blue" id="c1" />
                    <Field css="extra" id="c8" />
                    <Field css="green" id="c-1" />
                </tr>
                <tr>
                    <Field css="empty" content="&uarr;" id="startBlue" />
                    <Field id="c9" />
                    <Field css="empty" content="&uarr;" id="startGreen" />
                </tr>
                <tr>
                    <Field css="empty" id="c15" />
                    <Field id="c10" />
                    <Field css="empty" id="c-15" />
                </tr>
                <tr>
                    <Field css="blue" id="c14" />
                    <Field id="c11" />
                    <Field css="green" id="c-14" />
                </tr>
                <tr>
                    <Field css="blue extra" id="c13" />
                    <Field id="c12" />
                    <Field css="green extra" id="c-13" />
                </tr>
                </tbody>
            </table>
            <a href="https://en.wikipedia.org/wiki/Royal_Game_of_Ur" target="_blank" rel="noopener noreferrer">Royal Game of Ur at Wiki</a>
        </div>
    );
}

export default App;
