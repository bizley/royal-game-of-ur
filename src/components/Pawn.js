import React from 'react';

function Pawn(props) {
    return (
        <>
            <div className={props.player + ' pawn'}>&nbsp;</div>
        </>
    );
}

export default Pawn;
