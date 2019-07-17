import React, { Component } from 'react';
import '../styles/SortingQueries.css'

class SortingQueries extends Component {
    state = {
        sort_by: undefined,
        order: 'desc',
        p: 1,
        limit: 10
    }
    render () {
        const options = ['votes', 'author', 'created_at']
        const { order, p, limit } = this.state
        return (<form className="sortQueries">
            <select id='sort_by' onChange={this.handleChange} >
               { options.map(option => (
                    <option key={option} value={option} >{option}</option>
                ))}
            </select>
            <button id='order' onClick={this.orderToggle} className="orderButton">{order}</button>
            <input onChange={this.handleChange} type="number" id="p" placeholder={p} className="textbox"></input>
            <label htmlFor="p">Page</label>
            <input onChange={this.handleChange} id="limit" type="number" placeholder={limit} className="textbox"></input>
            <label htmlFor="limit">Results</label>
            <button type='submit' onClick={this.handleSubmit}>Re-Order</button>
        </form>)
    };
    componentDidUpdate({ p: prevP }, prevState) {
        const { p } = this.props
        if (prevP !== p) {
            this.setState({ p }) 
        }
    }
    

    handleChange = ({ target: { value, id } }) => {
        this.setState({
            [id]: value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.applyQueries(this.state)
    }
    orderToggle = (event) => {
        event.preventDefault()
        const {target: { innerText }} = event
        const refObj = {
            asc: 'desc',
            desc: 'asc'
        }
        
        this.setState ({
            order: refObj[innerText]
        })
    }
}
export default SortingQueries;