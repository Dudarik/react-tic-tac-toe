import Square from './Square'
import React from 'react'

class Board extends React.Component {
  renderSquare(i){
    // console.log(this.props)
    let wincell = false
    if (this.props.winner) wincell = this.props.winner.winline.includes(i)
    return (
      <Square
        winCell = {wincell}
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
      />
    )
  }
  
  render() {
    const rows = 3, columns = 3
    const board = []
    for (let i = 0; i < rows; i++) {
      const row = []
      for (let k = 0; k < columns; k++) {
        row.push(rows * i + k)
      }
      board.push(row)
    }
    
    return (
      <div>        
        {
          board.map(item => 
            <div className='board-row'> {
              item.map(square => this.renderSquare(square))
            } </div>)
        }
      </div>
    )
  }
}
export default Board