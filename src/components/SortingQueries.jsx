import React from 'react';

function SortingQueries(props) {
    const { dropDownOptions } = props
    console.log(dropDownOptions)
    return (
        <div className="sortQueries">
            <select className="dropdown">
               {/* { dropDownOptions.map(option => (
                    <option value={option}>{option}</option>
                ))} */}
            </select>
        </div>
    );
}
export default SortingQueries;