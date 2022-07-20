import React, { useState, useEffect } from 'react'

import { setNotification } from './reducers/notificationReducer'
import { initializeComments, resetComments } from './reducers/commentReducer'
import { useDispatch } from 'react-redux'

import commentService from './services/comments'
import userService from './services/users'
import flightService from './services/flights'

import CommentForm from './components/CommentForm'
import CommentsList from './components/CommentsList'

import Notification from './components/Notification'
import { Container, styled, Grid, Paper, Box, AppBar, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem, CssBaseline } from '@mui/material'
import AirlinesIcon from '@mui/icons-material/Airlines'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


import { createTheme, ThemeProvider  } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
}))

// Define theme settings
const light = {
  palette: {
    mode: 'light',
  },
}

const dark = {
  palette: {
    mode: 'dark',
  },
}


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const [users, setUsers] = useState([])
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState('')
  const dispatch = useDispatch()

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  useEffect(() => {
    dispatch(resetComments())
    dispatch(initializeComments(selectedFlight))
  },[dispatch])

  useEffect(() => {
    dispatch(resetComments())
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
      dispatch(resetComments())
      dispatch(initializeComments(selectedFlight))
      dispatch(setNotification(`A new comment ${returnedComment.id} added`, 3000, 'success'))
      return true
    }catch(exception){
      dispatch(setNotification(exception.response.data.error, 3000,'error'))
      return false
    }
  }
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <AirlinesIcon />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Flight Comments
              </Typography>
              <IconButton sx={{ ml: 1 }} onClick={changeTheme} color="inherit">
                {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon /> }
              </IconButton>
              {isDarkTheme ? 'Dark' : 'Light' }
            </Toolbar>
          </AppBar>
        </Box>
        <Notification/>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Item variant="outlined" elevation={0}>
                <Accordion expanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Select a flight</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl sx={{ m: 1, width: '80%' }} size="small">
                      <InputLabel id="select-flight-label">Flight</InputLabel>
                      <Select
                        labelId="select-flight-label"
                        required
                        id="flight-field-for-table"
                        value={selectedFlight}
                        name="flight"
                        label="Flight"
                        size="small"
                        onChange={handleFlightChange}
                      >
                        <MenuItem value={''}>All Flights</MenuItem>
                        {flights.map(flight => (
                          <MenuItem key={flight.id} value={flight.id}>{flight.flightNo} - {flight.airline}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Add a comment</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CommentForm createComment={addComment} flights={flights} users={users} />
                  </AccordionDetails>
                </Accordion>
              </Item>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Item variant="outlined" elevation={0}>
                <CommentsList/>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
export default App