import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

/*
* The purpose of this project is to work with the JS library React JS.
* React is a JavaScript library to build UIs that is declarative, efficient, and flexible.
* The main benefit is the library allows you to build smaller components to create bigger
* more complex components.
* Special features are the "time machine" feature that allows
*
* */

const Square = (props) => {
    /*
    * The Square component used to be a class but can be described more lightly as a function.
    * Since the component is controlled by the Board component, it is a child component.
    * */
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
};

class Board extends React.Component {
    //The Board component is the parent component

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();//creates a copy of the array we can change
        if(calculateWinner(squares) || squares[i]){
            //Prevents more moves if the box is already filled
            //or if a winner has been declared
            return;
        }
        squares[i] = (this.state.xIsNext) ? 'X' : 'O';//assigns X to the correlating position of the clicked box in the array
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });//sets the state to be the new copy
    }

    renderSquare(i){
        return(<Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />);  //passes a properties value and onClick with given values to the Square
        //Passing props is how information flows in React: Parents to children

        //This breaks the code because JS inserts a semicolon since there is no parenthesis
        // return <Square
        //     value={this.state.squares[i]}
        //     onClick={() => this.handleClick(i)}
        // />
    }

    render(){
        const winner = calculateWinner(this.state.squares);
        let status;
        //The following checks if there is a winner and then if not states the next player
        if(winner){
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)/*calls the renderSquare method*/}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/*status*/}</div>
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        );
    }
}

const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
};

//=============================================
ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}><Game /></Router>,
    document.getElementById('root')
);