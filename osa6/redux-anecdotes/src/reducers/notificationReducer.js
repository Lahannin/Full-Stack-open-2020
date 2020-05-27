const notificationReducer = (state = [] , action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data.message
      case 'SET_VOTENOTIFICATION':
        return action.data.message
      case "DELETE_NOTIFICATION":
            return null;
        default:
            return state;
    }
  }
  

export const handleNotification = (message) => {
    return { 
        type: 'SET_NOTIFICATION', 
        data: {
            message: message}
      }
  }

export const handleVoteNotification = (message) => {
    return dispatch => {
        dispatch({
      type: 'SET_VOTENOTIFICATION', 
      data: {
          message: 'You voted "' + message+ '"'}
    })
    setTimeout(() => {
        dispatch({
            type: "DELETE_NOTIFICATION"
        })
    }, 5000)
    }}





  export default notificationReducer