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
                    <div className="nav-filler"></div>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { gameState: 'start' , difficulty: 'EASY'};
    }

    easyOnClick = () => {
        this.setState({ gameState: 'play', difficulty: 'EASY'});
    }

    mediumOnClick = () => {
        this.setState({ gameState: 'play', difficulty: 'MEDIUM'});
    }

    hardOnClick = () => {
        this.setState({ gameState: 'play', difficulty: 'HARD'});
    }

    render() {
        const items = [];
        const diff = this.state.difficulty;
        if (this.state.gameState !== 'start') {
            items.push(<div key={0}></div>);
            items.push(<div key={1}><Board difficulty={diff}/></div>);
            items.push(<div key={2}></div>);
        } else {
            items.push(<button key={0} className="difficulty-button" value={"EASY"} onClick={this.easyOnClick}>EASY</button>);
            items.push(<button key={1} className="difficulty-button resize-button" value={"MEDIUM"} onClick={this.mediumOnClick}>MEDIUM</button>);
            items.push(<button key={2} className="difficulty-button" value={"HARD"} onClick={this.hardOnClick}>HARD</button>);
        }
        return (
            <div className="content">
                {items}
            </div>
        )
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);

        const modeMap = {
            'EASY' : 40,
            'MEDIUM' : 50,
            'HARD' : 60
        };
        
        let counter = modeMap[this.props.difficulty];

        let gridCopy = [];
        let pickedInRow = [];
        // randomize initial row
        for (let i = 0; i < 9; i++) {
            let choice = Math.floor((Math.random() * 9) + 1);
            if (!pickedInRow.includes(choice)) { 
                pickedInRow.push(choice);
            } else {
                i--;
            }
        }
        gridCopy.push(Array.from(pickedInRow));
        // shift 3 twice
        for (let j = 0; j < 2; j++){
            for (let i = 0; i < 3; i++) {
                let shift = pickedInRow.shift();
                pickedInRow.push(shift);
            }
            gridCopy.push(Array.from(pickedInRow));
        }

        //shift 1, shift 3, shift 3 (x2) for remaining rows
        for (let j = 0; j < 2; j++) {
            let shift = pickedInRow.shift();
            pickedInRow.push(shift);
            gridCopy.push(Array.from(pickedInRow));
            for (let i = 0; i < 3; i++) {
                let shift = pickedInRow.shift();
                pickedInRow.push(shift);
            }
            gridCopy.push(Array.from(pickedInRow));
            for (let i = 0; i < 3; i++) {
                let shift = pickedInRow.shift();
                pickedInRow.push(shift);
            }
            gridCopy.push(Array.from(pickedInRow));
        }

        while (counter > 0) {
            let randomXToRemove = Math.floor((Math.random() * 9));
            let randomYToRemove = Math.floor((Math.random() * 9));
            if (gridCopy[randomXToRemove][randomYToRemove] !== 0) {
                gridCopy[randomXToRemove][randomYToRemove] = 0;
                counter -= 1;
            }
        }
        
        this.state = ( { grid : gridCopy, currentChoice: 0 } );

    }

    inRow = (grid, row, val, x, y) => {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === val) { return true; }
        } 
        return false;
    }

    inCol = (grid, col, val, x, y) => {
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === val) { return true; }
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

    inRowHelper = (x, y, val) => {
        for (let i = 0; i < 9; i++) {
            if (this.state.grid[x][i] === val && i !== y) { return [x,i]; }
        } 
        return [-1,-1];    
    }

    inColHelper = (x, y, val) => {
        for (let i = 0; i < 9; i++) {
            if (this.state.grid[i][y] === val && i !== x) { return [i,y]; }
        }
        return [-1,-1];
    }

    inSquareHelper = (x, y, val) => {
        let squareNum = Math.floor(x / 3) + (Math.floor(y / 3) * 3) + 1;
        let xStart = Math.floor((squareNum - 1) % 3) * 3;
        let yStart = Math.floor((squareNum - 1) / 3) * 3;

        for (let i = xStart; i < xStart + 3; i++) {
            for (let j = yStart; j < yStart + 3; j++) {
                if (this.state.grid[i][j] === val && x !== i && y !== j) { return [i,j]; }
            }
        }
        return [-1,-1];
    }

    updateChoice = (choice) => {
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
        if (this.checkGameOver() === true && document.getElementsByClassName('red').length === 0 ) {
            return true;
        } else { 
            return false 
        }
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
        if (this.checkGameOver() === true && this.checkIfWin() === true) {
            win = 'You Won!'
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
        return this.props.inRowHelper(this.props.x, this.props.y, this.props.getCurrentChoice());
    }

    inColHelper = () => {
        return this.props.inColHelper(this.props.x, this.props.y, this.props.getCurrentChoice());
    }

    inSquareHelper = () => {
        return this.props.inSquareHelper(this.props.x, this.props.y, this.props.getCurrentChoice());
    }

    onClick = () => {
        const currentTile = document.getElementById(this.getId());
        // Remove previous choice color
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

            if (this.inRowHelper()[0] === -1 && this.inColHelper()[0] === -1 && this.inSquareHelper()[0] === -1) {
                currentTile.classList.add("green");
            } else {
                currentTile.classList.add("red");
            }
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

    render() {
        const items = [];
        
        for (let i = 1; i <= 9; i++) {
            items.push(<Choice key={i} value={i} updateChoice={this.props.updateChoice}/>)
        }

        return (
            <div className="choices-container">
                {items}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);