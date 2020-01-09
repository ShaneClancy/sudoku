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
        // this.state = { grid: new Array(9).fill(new Array(9).fill(0)), currentChoice: 0 };

        let gridCopy = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        const modeMap = {
            'EASY' : 40,
            'MEDIUM' : 30,
            'HARD' : 20,
        };
        
        let counter = modeMap['EASY'];
        let spotChoices = [[0,0]];

        while (counter > 0) {
            let x = Math.floor(Math.random() * 9);
            let y = Math.floor(Math.random() * 9);
            if (!spotChoices.includes([x,y])) {
                let squareNum = 0;
                squareNum = Math.floor(x / 3) + (Math.floor(y / 3) * 3) + 1;
                // guess random number to put in square.
                let indCounter = 0;
                while(true) {
                    const guess = Math.floor(Math.random() * 9) + 1;
                    if (!(this.inRow(gridCopy, x, guess)) && !(this.inCol(gridCopy, y, guess)) && !(this.inSquare(gridCopy, squareNum, guess))) {
                        gridCopy[x][y] = guess;
                        counter--;
                        spotChoices.push([x,y]);
                        break;
                    } else {
                        indCounter++;
                        if (indCounter >= 9) { break; }
                    }
                }
            }
        }
        
        this.state = ( { grid : gridCopy, currentChoice: 0 } );

    }

    inRow = (grid, row, val, x, y) => {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === val && x !== row && y !== i) { return true; }
        } 
        return false;
    }

    inCol = (grid, col, val, x, y) => {
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === val && x !== i && y !== col) { return true; }
        } 
        return false;
    }

    inSquare = (grid, squareNum, val, x , y) => {
        let xStart = Math.floor((squareNum - 1) % 3) * 3;
        let yStart = Math.floor((squareNum - 1) / 3) * 3;

        for (let i = xStart; i < xStart + 3; i++) {
            for (let j = yStart; j < yStart + 3; j++) {
                if (grid[i][j] === val && x !== i && y !== j) { return true; }
            }
        }
        return false;
    }

    inRowHelper = (x, val) => {
        for (let i = 0; i < 9; i++) {
            if (this.state.grid[x][i] === val) { return [x,i]; }
        } 
        return [-1,-1];    
    }

    inColHelper = (y, val) => {
        for (let i = 0; i < 9; i++) {
            if (this.state.grid[i][y] === val) { return [i,y]; }
        }
        return [-1,-1];
    }

    inSquareHelper = (x, y, val) => {
        let squareNum = Math.floor(x / 3) + (Math.floor(y / 3) * 3) + 1;
        let xStart = Math.floor((squareNum - 1) % 3) * 3;
        let yStart = Math.floor((squareNum - 1) / 3) * 3;

        for (let i = xStart; i < xStart + 3; i++) {
            for (let j = yStart; j < yStart + 3; j++) {
                if (this.state.grid[i][j] === val) { return [i,j]; }
            }
        }
        return [-1,-1];
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

    updateGrid = (x,y) => {
        let gridCopy = this.state.grid;
        gridCopy[x][y] = this.getCurrentChoice();
        this.setState( { grid: gridCopy, currentChoice: this.state.currentChoice });
    }

    checkGameOver = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.grid[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    checkIfWin = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.inRow(this.state.grid, i, this.state.grid[i][j], i, j) 
                || this.inCol(this.state.grid, j, this.state.grid[i][j], i, j) 
                || this.inSquare(this.state.grid, Math.floor(i / 3) + (Math.floor(j / 3) * 3) + 1, this.state.grid[i][j], i, j) ){
                    return false;
                }
            }
        }
        return true;
    }

    renderRow = (i) => {
        const items = [];

        for (let j = 0; j < 9; j++) {
            items.push(<Tile key={(i)*(9) + j} x={i} y={j} value={this.state.grid[i][j]} originalValue={this.state.grid[i][j]} hidden={false} getCurrentChoice={this.getCurrentChoice} updateGridParent={this.updateGrid} inRowHelper={this.inRowHelper} inColHelper={this.inColHelper} inSquareHelper={this.inSquareHelper}/>);
        }

        return items;
    }

    render() {

        let win = '';
        if (this.checkGameOver() === true && this.checkIfWin()) {
            win = 'You Won!'
        } else {
            win = 'Game not over yet!';
        }
        return  (
            <div className="content-container">
                <div>
                    <p className="game-state">{win}</p>
                </div>
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
        if (this.props.hidden === false || this.props.value === 0) { this.state =  { value: this.props.value, hidden : false }; }
        else {  this.state = { value: this.props.value, hidden : true }; }
    }

    getId = () => {
        return ("tile" + this.props.x.toString() + "." + this.props.y.toString());
    }

    getCurrentChoice = () => {
        return this.props.getCurrentChoice();
    }

    inRowHelper = () => {
        return this.props.inRowHelper(this.props.y, this.state.value);
    }

    inColHelper = () => {
        return this.props.inColHelper(this.props.y, this.state.value);
    }

    inSquareHelper = () => {
        return this.props.inSquareHelper(this.props.x, this.props.y, this.state.value);
    }

    onClick = () => {
        console.log(this.getId());
        const currentTile = document.getElementById(this.getId());
        // Remove previous choice color color
        let lastRedTile = document.getElementsByClassName("red");
        if (lastRedTile.length > 0) {
            lastRedTile[0].classList.remove("red");
        }
        let lastGreenTile = document.getElementsByClassName("green");
        if (lastGreenTile.length > 0) {
            lastGreenTile[0].classList.remove("green");
        }
        // Updte value on Tile
        if (this.props.originalValue === 0 && this.getCurrentChoice() !== 0) {
            this.setState( {value: this.getCurrentChoice(), hidden: false })
            this.props.updateGridParent(this.props.x, this.props.y);

            if (this.inRowHelper() !== [-1,-1] && this.inColHelper() !== [-1,-1] && this.inSquareHelper() !== [-1,-1]) {
                currentTile.classList.add("green");
            } else {
                currentTile.classList.add("red");
            }
            console.log(this.inRowHelper());
            console.log(this.inColHelper()); 
            console.log(this.inSquareHelper());
        }
    }

    render() {
        if (this.state.hidden === true || this.state.value === 0) {
            return (
                <button id={this.getId()} className="tile" onClick={this.onClick}><br></br></button>
            );
        } else {
            return (
                <button id={this.getId()} className='tile' onClick={this.onClick}>
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
        let oldSelection = document.getElementsByClassName("highlighted");
        if (oldSelection.length > 0) {
            oldSelection[0].classList.remove("highlighted");
        }
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