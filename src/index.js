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

        const gridCopy = new Array(9).fill(new Array(9).fill(0));

        gridCopy[0] = this.shuffle(Array.from(Array(9).keys()).map(x => ++x));

        this.state = ( { grid : gridCopy, currentChoice: 0 } );
        console.log(this.state.grid);

    }

    shuffle = (arr) => {
        var curr = arr.length;
        var temp, rand;

        while( curr !== 0 ) {

            rand = Math.floor(Math.random() * curr);
            curr -= 1;
        
            temp = arr[curr];
            arr[curr] = arr[rand];
            arr[rand] = temp;
        }

        return arr;
    }

    updateChoice = (choice) => {
        console.log(choice);
        this.setState( {currentChoice: choice });
    }

    getCurrentChoice = () => {
        return this.state.currentChoice;
    }

    renderChoices = () => {
        return <Choices currentChoice={this.state.currentChoice} updateChoice={this.updateChoice} getCurrentChoice={this.getCurrentChoice}/>
    }

    renderRow = (i) => {
        const items = [];

        for (let j = 0; j < 9; j++) {
            items.push(<Tile key={(i)*(9) + j} x={i} y={j} value={this.state.grid[i][j]}/>);
        }

        return items;
    }

    render() {

        return  (
            <div className="content-container">
                <div className="game-board">
                    <div className="board-row"> {this.renderRow(0)} </div>
                    <div className="board-row"> {this.renderRow(1)} </div>
                    <div className="board-row"> {this.renderRow(2)} </div>
                    <div className="board-row"> {this.renderRow(3)} </div>
                    <div className="board-row"> {this.renderRow(4)} </div>
                    <div className="board-row"> {this.renderRow(5)} </div>
                    <div className="board-row"> {this.renderRow(6)} </div>
                    <div className="board-row"> {this.renderRow(7)} </div>
                    <div className="board-row"> {this.renderRow(8)} </div>
                </div>
                <div className="choices">
                    {this.renderChoices()}
                </div>
            </div>
        );
    }
}

class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: this.props.value, hidden : true, x: this.props.x, y: this.props.y };
        if (this.props.hidden === false) { this.setState({ hidden: false }); }
    }

    getId = () => {
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
                <button id={this.getId()} className="tile" onClick={this.turnRed}><br></br></button>
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
        const choice = document.getElementById("choice" + this.props.value);
        choice.classList.add("highlighted");
    }

    render() {
        return (
            <button className="choice" id={"choice" + this.props.value} onClick={this.updateChoiceWithinChoice}>
                {this.props.value}
            </button>
        )
    }
}

class Choices extends React.Component {

    renderChoice = (i) => {
        var updateChoice = this.props.updateChoice;
        return <Choice value={i} updateChoice={updateChoice}/>
    }

    getCurrentChoiceTesting = () => {
        console.log(this.props.currentChoice);
    }


    render() {
        const items = [];
        
        for (let i = 1; i <= 9; i++) {
            items.push(<Choice key={i} value={i} updateChoice={this.props.updateChoice}/>)
        }

        return (
            <div className="choices-container">
                {items}
                <button onClick={this.getCurrentChoiceTesting}>Current Choice</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);