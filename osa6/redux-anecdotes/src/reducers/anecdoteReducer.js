const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedanecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedanecdote)
        
    default:
      return state
  }
}

const generateId = () => 
  (100000 * Math.random()).toFixed(0)


export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
    content: content,
    id: generateId(),
    votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}




export default reducer