import React, { useState, useEffect } from 'react'

import { setNotification } from './reducers/notificationReducer'
import { initializeComments } from './reducers/commentReducer'
import { useDispatch, useSelector } from 'react-redux'

import commentService from './services/comments'
import userService from './services/users'
import flightService from './services/flights'

import CommentForm from './components/CommentForm'
import CommentsList from './components/CommentsList'

import Notification from './components/Notification'
import { styled, Grid, Paper, Box, AppBar, Toolbar, Typography, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import AirlinesIcon from '@mui/icons-material/Airlines'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
}))

const App = () => {

  const [users, setUsers] = useState([])
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const dispatch = useDispatch()
  const commentsStore = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(initializeComments(selectedFlight))
  },[dispatch])

  useEffect(() => {
    dispatch(initializeComments(selectedFlight))
  },[selectedFlight])

  //here im going just for one time load the harcoded users and flights
  useEffect(async () => {
    const returnedusers = await userService.getAll()
    if(returnedusers) {
      setUsers(returnedusers)
    }
    const returnedflights = await flightService.getAll()
    if(returnedflights) {
      setFlights(returnedflights)
    }
  },[])

  const handleFlightChange = (event) => {
    setSelectedFlight(event.target.value)
  }

  const addComment = async (commentObject) => {
    try {
      const returnedComment = await commentService
        .create(commentObject)
      dispatch(initializeComments(selectedFlight))
      dispatch(setNotification(`A new comment ${returnedComment.id} added`, 3000, 'success'))
      return true
    }catch(exception){
      dispatch(setNotification(exception.response.data.error, 3000,'error'))
      return false
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <AirlinesIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             Flight Comments
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Notification/>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Item variant="outlined" elevation={0}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Select a flight
                <FormControl sx={{ m: 1, width: '70%' }} size="small">
                  <InputLabel id="select-flight-label">Flight</InputLabel>
                  <Select
                    labelId="select-flight-label"
                    required
                    id="flight-field"
                    value={selectedFlight}
                    name="flight"
                    label="Flight"
                    size="small"
                    onChange={handleFlightChange}
                  >
                    <MenuItem value={null}>All Flights</MenuItem>
                    {flights.map(flight => (
                      <MenuItem key={flight.id} value={flight.id}>{flight.flightNo} - {flight.airline}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Typography>
              <Divider />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Add a comment
                <CommentForm createComment={addComment} flights={flights} users={users} />
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Item variant="outlined" elevation={0}>
              <CommentsList commentsStore={commentsStore}/>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
export default App