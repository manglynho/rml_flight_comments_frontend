const notificationReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_NOTIF':
    return action.data
  case 'UNSET_NOTIF':
    if(state.id === action.data.id){
      return null
    }
    return state
  default:
    return state
  }
}

function showNotification(id, text , style) {
  let data = {
    id: id,
    text: text,
    style: style
  }
  return { type: 'SET_NOTIF', data }
}
function hideNotification(id) {
  let data = {
    id: id,
    text: null,
    style: null,
  }
  return { type: 'UNSET_NOTIF', data }
}

let nextNotificationId = 0

export function setNotification(text, time, style) {
  return function (dispatch) {
    const id = nextNotificationId++
    dispatch(showNotification(id, text, style))
    setTimeout(() => {
      dispatch(hideNotification(id))
    }, time)
  }
}


export default notificationReducer