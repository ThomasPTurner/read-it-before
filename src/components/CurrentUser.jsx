import '../styles/nav.css'
import React from 'react';

function CurrentUser({user}) {
    return (
        <div className= "currentUser">
            <p>
                <span className="loggedIn">
                    logged in:
                </span>
                {user}
            </p>
        </div>
    );

}
export default CurrentUser