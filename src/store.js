import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import commentReducer from './reducers/commentReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  comments: commentReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)  )
)

export default store