import React from 'react'
import { Col , Card, ListGroup, Badge } from 'react-bootstrap'
import dateFormat from 'dateformat'
import devicesService from '../services/devices'
import { setNotification } from '../reducers/notificationReducer'
import { initializeGateways } from '../reducers/gatewayReducer'
import { useDispatch } from 'react-redux'

const Device = ({ device }) => {

  const dispatch = useDispatch()

  const removeDevice = async (device) => {
    console.log(device)
    try{
      await devicesService.remove(device.id)
      dispatch(setNotification(`Removed ${device.uid}`, 3000, 'success'))
      dispatch(initializeGateways())
    }catch(error){
      if (error.response) {
        // Request made and server responded
        dispatch(setNotification(error.response.data.error, 3000, 'error'))
      }else{
        dispatch(setNotification(error.message, 3000, 'error'))
      }
    }

  }

  return(
    <Col sm={3} className="mt-3">
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>uid: <a href={`/api/devices/${device.id}`} target='_blank' rel="noreferrer">{ device.uid } </a></ListGroup.Item>
          <ListGroup.Item>vendor: { device.vendor }</ListGroup.Item>
          <ListGroup.Item>date: { dateFormat( device.date, 'mmmm dS, yyyy')  }</ListGroup.Item>
          <ListGroup.Item>status: {
            device.status === true
              ? <Badge bg="success">Online</Badge>
              : <Badge bg="secondary">Offline</Badge>
          }
          </ListGroup.Item>
          <ListGroup.Item>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                if (window.confirm(`Delete ${device.uid} ?`)) {
                  removeDevice(device)
                }
              }}
            >
            Remove
            </button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  )
}

export default Device