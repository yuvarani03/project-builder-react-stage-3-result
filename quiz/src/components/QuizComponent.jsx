import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Questions from '../resources/questions.json'

export default class QuizComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qid: 0,
            time: 258,
            ans: [0, 0, 0, 0, 0, 0, 0, 0, 0,0]
        }
        this.intervalId = setInterval(this.timer.bind(this), 1000)
        this.removeId = setInterval(this.removeAns.bind(this), 2000);
    }

    nextQ = () => {
        this.setState({
            qid: this.state.qid + 1
        })
        if (this.state.qid >= 8) {
            document.getElementById("next").classList.add("dis");
            this.setState({
                qid: 9
            })
        } else {
            document.getElementById("prev").classList.remove("dis");
        }
    }

    prevQ = () => {
        this.setState({
            qid: this.state.qid - 1
        })
        if (this.state.qid <= 1) {
            document.getElementById("prev").classList.add("dis");
            this.setState({
                qid: 0
            })
        } else {
            document.getElementById("next").classList.remove("dis");
        }
    }

    quitBtn = () => {
        clearInterval(this.intervalId);
        clearInterval(this.removeId);
        this.props.sentAns(this.state.ans);
    }

    timer = () => {
        this.setState({
            time: this.state.time - 1
        })
        if (this.state.time < 1) {
            this.quitBtn();
        }
    }

    optionSelect = (e) => {
        let span = document.createElement("span");
        if (Questions[this.state.qid].answer === e.target.value) {
            span.textContent = "Correct Answer";
            span.classList.add("yes");
            let newAns = [...this.state.ans];
            newAns[this.state.qid] = 1;
            this.setState({
                ans: [...newAns]
            })
        } else {
            span.textContent = "Wrong Answer";
            span.classList.add("no");
            let newAns = [...this.state.ans];
            newAns[this.state.qid] = -1;
            this.setState({
                ans: [...newAns]
            })
        }
        document.getElementById("ans").appendChild(span);
        this.nextQ()
    }

    removeAns = () => {
        let spans = document.getElementById("ans");
        if (spans === null) {
            clearInterval(this.removeId);
        } else {

            if (spans.hasChildNodes()) {
                spans.removeChild(spans.firstChild);
            }
        }
    }

    render() {
        return (
            <div className="box">
                <h1>Question</h1>
                <div className="ans" id="ans"></div>
                <div className="quest">
                    <span>{this.state.qid + 1} of {Questions.length}</span>
                    <span>{Questions[this.state.qid].question}</span>
                    <span>{this.state.time} <img src="./img/timer.jfif" alt="timer" /></span>
                </div>
                <div className="opts">
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].options[0]}>{Questions[this.state.qid].options[0]}</button>
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].options[1]}>{Questions[this.state.qid].options[1]}</button>
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].options[2]}>{Questions[this.state.qid].options[2]}</button>
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].options[3]}>{Questions[this.state.qid].options[3]}</button>
                </div>
                <div className="change">
                    <button onClick={this.prevQ} id="prev" className="dis">Previous</button>
                    <button onClick={this.nextQ} id="next">Next</button>
                    <Link to="/result" onClick={this.quitBtn}>Quit</Link>
                </div>
            </div>
        )
    }
}