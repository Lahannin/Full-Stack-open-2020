import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({nimi}) => {
    console.log("header", nimi)
    return (
        <div>
            <h1>{nimi}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log("content", props)
    return (
        <div>
            <Part osa={props.parts[0].name} tehtava={props.parts[0].exercises} />
            <Part osa={props.parts[1].name} tehtava={props.parts[1].exercises} />
            <Part osa={props.parts[2].name} tehtava={props.parts[2].exercises} />
        </div>
    )
}

const Part = ({osa, tehtava}) => {
    console.log("part", osa, tehtava)
    return (
        <div>
            <p>{osa} {tehtava}</p>
        </div>
    )
}

const Total = (props) => {
    console.log("total", props)
    return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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
      <Header nimi={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))