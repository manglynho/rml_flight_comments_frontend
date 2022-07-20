import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_COMMENTS':
    return action.data
  default:
    return state
  }
}


export const initializeComments = (selectedFlight) => {
  return async dispatch => {
    const comments = await commentService.getAll(selectedFlight)
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    })
  }
}


export default commentReducer