import React, { Component } from 'react';

class SortingQueries extends Component {
    state = {
        sort_by: undefined,
        order: undefined,
        p: undefined,
        limit: undefined
    }
    render () {
        const options = ['votes', 'author', 'created_at'] 
        return (<form className="sortQueries">
            <select id='sort_by' onChange={this.handleChange} className="dropdown">
               { options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <select id='order' onChange={this.handleChange} className="dropdown">
               <option key="asc" >asc</option>
               <option key="desc" >desc</option>
            </select>
            <input onChange={this.handleChange} id="p" placeholder="1"></input>
            <label htmlFor="p">Page</label>
            <input onChange={this.handleChange} id="limit" placeholder="10"></input>
            <label htmlFor="limit">results per page</label>
            <button type='submit' onClick={this.handleSubmit}>Re-Order</button>
        </form>)
    };

    handleChange = ({ target: { value, id } }) => {
        this.setState({
            [id]: value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.applyQueries(this.state)
    }
}
export default SortingQueries;