import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  })
  

const store = createStore(
  reducer, applyMiddleware(thunk))
  
  export default store