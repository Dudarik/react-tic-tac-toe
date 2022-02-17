import HistoryButton from './HistoryButton'
import Board from './Board'
import calclulateWinner from '../utils/calculateWinner'
import React from 'react'

class Game extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      history: [{
        squares: Array(9).fill(null),
        coulumnNumber: 0,
        rowNumber: 0,
      }],
      xIsNext: true,
      stepNumber: 0,
      historyBtns: [true],
    }
  }

  jumpTo(step){
    const historyBtns = this.state.historyBtns.slice()

    for (let i = 0; i < historyBtns.length; i++) {
      historyBtns[i] = false      
    }
    historyBtns[step] = true
    historyBtns.length = step + 1

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      historyBtns,
    })
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    const coulumnNumber = i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3
    const rowNumber = i < 3 ? 1 : i > 2 && i < 6 ?  2 : 3
    const historyBtns = this.state.historyBtns.slice()

    historyBtns[this.state.stepNumber] = false
    historyBtns.push(true)
    
    if (calclulateWinner(squares) || squares[i]) {     
      return
    }

    squares[i] = this.state.xIsNext ? "Хч" : "Оп"
    this.setState({
      history: [...history, ...[{squares, coulumnNumber, rowNumber}]],      
      // history: history.concat([{squares:squares, coulumnNumber, rowNumber}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      historyBtns
    })
    
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calclulateWinner(current.squares)

    // console.log(winner)
    // const historyBtns = this.state.historyBtns.slice()


    const moves = history.map((step, move) => {
      const col = history[move].coulumnNumber
      const row = history[move].rowNumber

      const desc = move ? `Перейти к ходу № ${move} | строка: ${row} колонка: ${col}` : 'К началу игры'
      
      return (
        <li key={move}>
          <HistoryButton
            active = {this.state.historyBtns[move]}
            value = {desc}
            onClick={() => {this.jumpTo(move)}
            }
          />
        </li>
      )
    })

    let status
    
    if (winner) {
      status = `Выиграл игрок ` + winner.winner
    } else {
      status = `Next palyer: ${this.state.xIsNext ? "Хч" : "Оп"}` 
    }

    if (this.state.stepNumber === 9 && !winner?.winner) status = 'Ничья'

    return ( 
      <div className = 'game'>
        <div className = 'game-board'>
          <Board 
            winner = {winner}
            squares = {current.squares}
            onClick = {i => this.handleClick(i)}
          />
        </div> 
        <div className = 'game-info'>
          <div> {status} </div> 
          <div> {moves} </div> 
        </div> 
      </div>
    )
  }
}

export default Game