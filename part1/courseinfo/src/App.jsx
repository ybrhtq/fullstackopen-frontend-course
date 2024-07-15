const Header = (props) => (
  <>
  <h1>{props.course}</h1>
  </>
)

const Content = (props) => {
  return (
    <>
    <p>{props.parts[0].name} {props.parts[0].exercises}</p>
    <p>{props.parts[1].name} {props.parts[1].exercises}</p>
    <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </>
  )
}

const Total = (props) => {
  const total = props.numbers[0] + props.numbers[1] + props.numbers[2]
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total numbers={course.parts.map((part) => part.exercises)}/>
    </div>
  )
}

export default App