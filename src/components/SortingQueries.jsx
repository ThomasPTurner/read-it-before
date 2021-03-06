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
        const { order, p, limit } = this.state
        const { otherSearchOptions } = this.props
        const options = ['created_at', 'votes', 'author', ...otherSearchOptions]
        return (<form className="sortQueries">
            <select id='sort_by' onChange={this.handleChange} >
            <option disabled selected hidden>Sort by...</option>
               { options.map(option => (
                    <option key={option} value={option} >{option}</option>
                ))}
            </select>
            <button id='order' onClick={this.orderToggle} className="orderButton">{order}</button>
            <input onChange={this.handleChange} type="number" value={p} id="p" placeholder={p} className="textbox"></input>
            <label htmlFor="p">Page</label>
            <input onChange={this.handleChange} id="limit" type="number" value={limit} placeholder={limit} className="textbox"></input>
            <label htmlFor="limit">Results</label>
            <button type='submit' onClick={this.handleSubmit}>Order</button>
        </form>)
    };
    componentDidUpdate({ p: prevP }, prevState) {
        const { p } = this.props
        if (prevP !== p) {
            this.setState({ p }) 
        }
    }
    
    handleChange = ({ target: { value, id } }) => {
        if (id === 'p' || id === 'limit') {
            if (value < 1) {
                this.setState({
                    [id]: 1
                })
            }
        } else {
            this.setState({
                [id]: value
            })
        }
    }

    handleSubmit = (event) => {
        const { applyQueries } = this.props
        event.preventDefault()
        applyQueries(this.state)
    };

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