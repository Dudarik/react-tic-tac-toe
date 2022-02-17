function HistoryButton(props){
  const btnClasses = []
  if (props.active) btnClasses.push('green')
  
  return (
    <button
      className={btnClasses.join(' ')}
      onClick = {props.onClick}
    >
      {props.value}
    </button>
  )
}

export default HistoryButton