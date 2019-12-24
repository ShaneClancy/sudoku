import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Game />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="top">
                <div className="header">
                    <div className="title">Sudoku</div>
                </div>
                <div className="nav">
                    <div className="nav-component">Info</div>
                    <div className="nav-component">Help</div>
                    <div className="nav-component">Documentation</div>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="content">
                <div></div>
                <div><Board /></div>
                <div></div> 
            </div>
        )
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        // Initialize Grid and Current Selected Choice
        this.state = { grid: new Array(9).fill(new Array(9).fill(0)), currentChoice: 0 };
        this.updateChoice = this.updateChoice.bind(this);
    }

    updateChoice(choice) {
        this.setState( {currentChoice: choice });
    }

    getGridIfRevealed(x,y) {
        return this.state.grid[x][y];
    }

    renderSquares(x,y) {
        return <Squares x={x} y={y} getGridIfRevealed={this.getGridIfRevealed}/>
    }

    renderChoices() {
        return <Choices currentChoice={this.state.currentChoice} updateChoice={this.updateChoice}/>
    }

    render() {
        return  (
            <div className="content-container">
                <div className="game-board">
                    <div className="board-row">
                        {this.renderSquares(0,0)}
                        {this.renderSquares(0,1)}
                        {this.renderSquares(0,2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquares(1,0)}
                        {this.renderSquares(1,1)}
                        {this.renderSquares(1,2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquares(2,0)}
                        {this.renderSquares(2,1)}
                        {this.renderSquares(2,2)}
                    </div>
                </div>
                <div className="choices">
                    {this.renderChoices()}
                </div>
            </div>
        );
    }
}

class Squares extends React.Component {

    renderTile(x,y) {
        return <Tile x={x} y={y} value={Math.floor(Math.random() * 9) + 1}/>
    }

    render() {
        return (
            <div className="squares-collection">
                <div className="squares-row">
                    {this.renderTile(0,0)}
                    {this.renderTile(0,1)}
                    {this.renderTile(0,2)}
                </div>
                <div className="squares-row">
                    {this.renderTile(1,0)}
                    {this.renderTile(1,1)}
                    {this.renderTile(1,2)}
                </div>
                <div className="squares-row">
                    {this.renderTile(2,0)}
                    {this.renderTile(2,1)}
                    {this.renderTile(2,2)}
                </div>
            </div>
        );
    }
}

class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: this.props.value, hidden : true, x: this.props.x, y: this.props.y };
    }

    getId() {
        return ("tile" + this.props.x.toString() + "." + this.props.y.toString());
    }

    turnRed = () => {
        console.log(this.getId());
        const currentTile = document.getElementById(this.getId());
        currentTile.classList.add("red");
    }

    render() {
        if (this.state.hidden === true) {
            return (
                <button id={this.getId()} className="tile" onClick={this.turnRed}><span>\t </span></button>
            );
        } else {
            return (
                <button className='tile' onClick={this.turnRed}>
                    {this.state.value}
                </button>
            );
        }
    }
}

class Choice extends React.Component {

    updateChoiceWithinChoice = () => {
        this.props.updateChoice(this.props.value);
    }

    render() {
        return (
            <button className="choice" id={"choice" + this.props.value} onClick={this.props.updateChoice}>
                {this.props.value}
            </button>
        )
    }
}

class Choices extends React.Component {

    renderChoice(i) {
        var updateChoice = this.props.updateChoice;
        return <Choice value={i} updateChoice={updateChoice}/>
    }

    render() {
        return (
            <div className="choices-container">
                {this.renderChoice(1)}
                {this.renderChoice(2)}
                {this.renderChoice(3)}
                {this.renderChoice(4)}
                {this.renderChoice(5)}
                {this.renderChoice(6)}
                {this.renderChoice(7)}
                {this.renderChoice(8)}
                {this.renderChoice(9)}
                <button onClick={() => {console.log(this.props.currentChoice)}} label="Current Choice"/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);