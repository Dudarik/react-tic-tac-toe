function Square(props) {
  const squareClasses = ['square']

  if (props.winCell) squareClasses.push('win-cell')

  return(
    <button 
      className={squareClasses.join(' ')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

export default Square