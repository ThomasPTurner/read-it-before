import React from 'react';
import '../styles/previousNext.css'

function PreviousNext({p, limit, max, turnPage}) {
    const lastPage = Math.ceil(+max / limit)
    return (
        <div className="PreviousNext">
            <p onClick={turnPage} id="prev" className="previous">{(p <= 1) ? '' : 'Prev'}</p>
            <p onClick={turnPage} id="next" className="next">{(p >= lastPage) ? '' : 'Next'}</p>
        </div>
    );
};

export default PreviousNext