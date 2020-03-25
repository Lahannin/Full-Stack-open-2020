import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button= ({handleClick, text}) =>{
    console.log('Button', handleClick, text)
    return (
        <button 
            onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistic = ({text, value, text2}) => {
    console.log('Statistic', text, value, text2)
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
            <td>{text2}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    console.log('Statistics', good, neutral, bad)
    const sum = good + bad + neutral
    if (sum === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    return(
        <div>
            <table>
                <tbody>
                    <Statistic text="Good: " value={good} text2="" />
                    <Statistic text="Neutral: " value={neutral} text2="" />
                    <Statistic text="Bad: " value={bad} text2="" />
                    <Statistic text="All: " value={sum} text2=""/>
                    <Statistic text="Average:" value={((good - bad)/(sum)).toFixed(2)} text2=""/>
                    <Statistic text="Positive: " value={(good/(sum)*100).toFixed(2)} text2="%"/>
                </tbody>
            </table>
        </div>
    )
}


const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


  
    const handleGoodClick = () => {
      setGood(good + 1)
    }
  
    const handleNeutralClick = () => {
      setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
      }
  
    return (
      <div>
            <h1>Give feedback</h1>
            <Button handleClick={handleGoodClick} text='Good' />
            <Button handleClick={handleNeutralClick} text='Neutral' /> 
            <Button handleClick={handleBadClick} text='Bad' /> 
            <h3>Statistics:</h3>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
            />
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
