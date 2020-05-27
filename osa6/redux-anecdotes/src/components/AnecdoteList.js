import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { handleVoteNotification } from '../reducers/notificationReducer'



const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const handleVote = (anecdote) => {
    const content = anecdote.content
    dispatch(voteAnecdote(anecdote.id))
    dispatch(handleVoteNotification(content))
    }
    
  const orderByVotes = (anecdotes) => {
    return anecdotes.sort((a,b) => {
    return b.votes - a.votes;
    })
  }

return (
    <div>
     {orderByVotes(anecdotes).map(anecdote =>
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


export default AnecdoteList