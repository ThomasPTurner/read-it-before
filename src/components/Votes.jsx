import React, { Component } from 'react';
import API from '../utils/api-utils';

class Votes extends Component {
    state = {
        votes: 0,
        changedVotes: 0
    }
    render() {
        const { votes, changedVotes } = this.state
        return (
            <div>
                <p className="arrows" id="upArrow" onClick={(changedVotes > 0) ? null : this.changeVote} >⇧</p>
                <p>{votes}</p>
                <p className="arrows" id="downArrow" onClick={(changedVotes < 0) ? null : this.changeVote} >⇩</p>
            </div>
        );
    }
    thi
    componentDidMount() {
        const { votes } = this.props
        this.setState({
            votes
        })
    }

    optimisticVotes = (id, refObj) => {
        this.setState(()=>{
            let { votes, changedVotes } = this.state
            votes += refObj[id]
            changedVotes += refObj[id]
            return { votes, changedVotes }
        })
    }

    changeVote = ({target: {id}}) => {
        const refObj = {
            upArrow: 1,
            downArrow: -1
        }
        const { voteType, parentId } = this.props
        this.optimisticVotes(id, refObj)
        API.patchVotes(voteType, parentId, refObj[id])
    }
}

export default Votes;