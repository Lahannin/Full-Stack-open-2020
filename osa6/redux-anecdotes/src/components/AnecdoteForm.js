import React from 'react'
import { connect } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { handleNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {  
    const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.createAnecdote(content)
      props.handleNotification(content)
      
    }
  
    return (
        <div>
          <h2>Create Anecdote</h2>
          <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>add</button>
          </form>
        </div>
    )
  }
  
  
  const mapDispatchToProps = {
    createAnecdote,
    handleNotification
  }
  

  const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
  )(AnecdoteForm)
  
  
  export default ConnectedAnecdoteForm