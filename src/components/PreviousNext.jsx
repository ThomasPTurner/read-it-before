import React from 'react';
import '../styles/previousNext.css'

function PreviousNext({p, limit, max, turnPage}) {
    const lastPage = Math.ceil(+max / limit)
    return (
        <div className="PreviousNext">
            {(p <= 1) ? null : <button onClick={turnPage} id="prev" className="previous">Prev</button>}
            {(p >= lastPage) ? null : <button onClick={turnPage} id="next" className="next">Next</button>}
        </div>
    );
};

export default PreviousNext 