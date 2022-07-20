import React from 'react'
import { connect } from 'react-redux'
import  Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  let alert_style = props.style

  return (
    <>
      <Alert style={{ marginTop: '20px' }} severity={alert_style}>
        {props.notification}
      </Alert>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity={alert_style} sx={{ width: '100%' }}>
          {props.notification}
        </Alert>
      </Snackbar>
    </>
  )
}

const mapStateToProps = (state) => {
  if(state.notification === null || state.notification.length  === 0){
    return { notification: null }
  }
  if ( state.notification.text === null ) {
    return { notification: null }
  }  else{
    return {
      notification: state.notification.text,
      style: state.notification.style
    }
  }
}


const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification