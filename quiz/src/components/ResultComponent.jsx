import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ans: [...this.props.sentAns],
            res: ""
        }
    }
    render() {
        return (
            < div className="result">
                <div className="icon"><img src="./img/result.png" alt=""/></div>
                <h2>Result</h2>
                <div className="box rslt">
                    {
                        ((this.state.ans.filter((answer) => {
                            return answer === 1
                        }).length) / (this.state.ans.length) * 100) < 60 ?
                            <h2>You need more practice</h2>
                            :
                            <h2>You did good!!</h2>
                    }
                    <h1>Your Score: {
                        ((this.state.ans.filter((answer) => {
                            return answer === 1
                        }).length) / (this.state.ans.length) * 100).toFixed(2)
                    }%</h1>
                    <div className="res">
                        <div className="list"><span>Total number of questions</span><span>{this.state.ans.length}</span></div>
                        <div className="list"><span>Number of attempted questions</span><span>{
                            this.state.ans.filter((answer) => {
                                return answer !== 0
                            }).length
                        }</span></div>
                        <div className="list"><span>Number of Correct Answers</span><span>{
                            this.state.ans.filter((answer) => {
                                return answer === 1
                            }).length
                        }</span></div>
                        <div className="list"><span>Number of Wrong Answers</span><span>{
                            this.state.ans.filter((answer) => {
                                return answer === -1
                            }).length
                        }</span></div>
                    </div>
                </div>
                <div className="btns"><Link to="/quiz">Play Again</Link><Link to="/">Back to Home</Link></div>
            </div>
        )
    }
}