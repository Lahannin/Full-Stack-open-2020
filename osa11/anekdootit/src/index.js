import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({name}) => {
    console.log('Header', name)
    return (
    <div>
        <h1>
          {name}
        </h1>
    </div>
    )
}

const Button= ({onClick, text}) => {
    console.log('Button', onClick, text)
    return (
      <button 
        onClick={onClick}>
        {text}
      </button>
    )
}

const App = (props) => {
  const title1 = "Anecdote of the Day"
  const title2 = "Anecdote with most votes"
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6))
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))

  const randomNumber = () => {
      return (
        setSelected(Math.floor(Math.random() * 6))  
      )
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    return (
      setPoints(copy))
  } 

  const max = points.reduce((a,b) => {
    return Math.max(a,b)}) 

  const popular = points.indexOf(max);

  return (
    <div>
      <Header name={title1} />
      {props.anecdotes[selected]}
      <br></br>
      <Button onClick={vote} text='vote' />
      <Button onClick={randomNumber} text='Next anecdote' />
      <Header name={title2} />
      {props.anecdotes[popular]}
      <p>has {max} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)