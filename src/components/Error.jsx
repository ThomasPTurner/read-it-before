import React, { Component } from 'react';

class Error extends Component {
    render() {
        if (!this.props.location.state) {
            return (
            <div>
                <h1>error 404</h1>
                <h3>page not found</h3>
            </div>
            )
        }
        const { code, msg } = this.props.location.state
        return (
            <div>
                <h1>error {code}</h1>
                <h3>{msg}</h3>
            </div>
        );
    }
}

export default Error;
