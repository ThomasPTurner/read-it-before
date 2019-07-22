import React, { Component } from 'react';
import '../styles/Error.css'

class Error extends Component {
    render() {
        const { state } = this.props.location
        const [code, msg] = state ? [state.code, state.msg] : [404, 'page not found']
        return (
            <div className="Error">
                <h1>error {code}</h1>
                <h3>{msg}</h3>
            </div>
        );
    }
}

export default Error;
