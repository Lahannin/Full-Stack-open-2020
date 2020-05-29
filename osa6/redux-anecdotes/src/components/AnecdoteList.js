import React from 'react'
import { connect } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { handleVoteNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  const handleVote = (anecdote) => {
    const content = anecdote.content
    props.voteAnecdote(anecdote.id)
    props.handleVoteNotification(content)
    }
    
  const orderByVotes = (anecdotes) => {
    return anecdotes.sort((a,b) => {
    return b.votes - a.votes
    })
  }

return (
    <div>
     {orderByVotes(props.anecdotes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification
  }
}


const mapDispatchToProps = {
  voteAnecdote,
  handleVoteNotification
}


const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)


export default ConnectedAnecdoteList