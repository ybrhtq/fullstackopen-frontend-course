import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => <tr><td>{props.statName}</td><td>{props.statValue}</td></tr>

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) === 0) {
    return <div>No feedback given</div>
  }
  const average = (props.good - props.bad) / (props.good + props.neutral + props.bad)
  const all = props.good + props.neutral + props.bad
  const positive = (props.good) * 100 / (props.good + props.neutral + props.bad)
  return (
    <div>
      <table>
        <thead><tr><td><b>stat</b></td><td><b>val</b></td></tr></thead>
        <tbody>
          <StatisticLine statName='good' statValue={props.good}/>
          <StatisticLine statName='neutral' statValue={props.neutral}/>
          <StatisticLine statName='bad' statValue={props.bad}/>
          <StatisticLine statName='average' statValue={average.toFixed(1)}/>
          <StatisticLine statName='all' statValue={all}/>
          <StatisticLine statName='positive' statValue={positive.toFixed(1) + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log('good:', good)
  console.log('neutral:', neutral)
  console.log('bad:', bad)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App