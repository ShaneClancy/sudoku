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
            <div className="header">
                <div className="nav-component">Info</div>
                <div className="nav-component">Help</div>
                <div className="nav-component">Documentation</div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="content">
                <Board /> 
            </div>
        )
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        // Initialize Grid and Current Selected Choice
        this.state = { grid: new Array(9).fill(new Array(9).fill(0)), currentChoice: 0 };
    }

    updateChoiceNumberBoard = (choiceNumber) => { 
        this.setState({ currentChoice: choiceNumber });
    }

    renderSquares(x,y) {
        return <Squares x={x} y={y} />
    }

    renderChoices() {
        return <Choices currentChoice={this.state.currentChoice} updateChoiceNumberBoard={this.updateChoiceNumberBoard}/>
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
        return <Tile x={x} y={y} />
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
    render() {
        const value = Math.floor(Math.random() * 9) + 1;
        return (
            <button className='tile'>
                {value}
            </button>
        );
    }
}

class Choice extends React.Component {

    render() {
        return (
            <button className="choice" onClick={this.props.updateChoiceNumber}>
                {this.props.value}
            </button>
        )
    }
}

class Choices extends React.Component {

    updateChoiceNumber = (i) => {
        this.props.updateChoiceNumberBoard(i);
    }

    renderChoice(i) {
        return <Choice value={i} updateChoiceNumber={this.updateChoiceNumber}/>
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