import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
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


export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find(n => n.id === id)
    const changedanecdote = { 
      ...anecdoteToChange, 
      votes: anecdoteToChange.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(id, changedanecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote
    })
}
}





export default reducer