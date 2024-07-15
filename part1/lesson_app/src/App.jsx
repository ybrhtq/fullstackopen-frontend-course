const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you {props.action}</p>
    </div>
  )
}

const App = () => {
  const nm = 'Nikita'
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name={nm} action={(nm === 'Nikita') ? 'rock' : 'suck'} />
    </div>
  )
}

export default App