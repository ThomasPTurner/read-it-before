import React from 'react';
import '../styles/previousNext.css'

function PreviousNext({p, turnPage}) {
    return (
        <div className="PreviousNext">
            <p onClick={turnPage} id="prev" className="previous">{(p === 1)? '' : 'Prev'}</p>
            <p onClick={turnPage} id="next" className="next">next</p>
        </div>
    );
};

export default PreviousNext