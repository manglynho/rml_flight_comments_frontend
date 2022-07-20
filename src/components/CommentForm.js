import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box,  Button, FormControl, Select, MenuItem, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const validationSchema = yup.object().shape({
  comment: yup
    .string()
    .required('Comment is required'),
  flight: yup
    .string()
    .required('Flight is required'),
  user: yup
    .string()
    .required('User is required'),
})

const CommentForm = ({ createComment, flights , users }) => {

  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')

  const formik = useFormik({
    initialValues: {
      comment: '',
      tags: '',
      flight: '',
      user: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const result = createComment({
        comment: values.comment,
        flight: values.flight,
        user: values.user,
        tags: tags,
      })
      if(result){
        formik.resetForm()
      }
    },
  })


  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const addTag = () => {
    if(tag.length > 0){
      setTags(tags.concat(tag))
      setTag('')
    }
  }

  return(
    <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <FormControl sx={{ m: 1, width: '80%' }} size="small">
        <InputLabel id="select-flight-label">Flight</InputLabel>
        <Select
          inputProps={{ 'data-testid': 'flight-field' }}
          labelId="select-flight-label"
          required
          id="flight-field"
          value={formik.values.flight}
          name="flight"
          label="Flight"
          size="small"
          onChange={formik.handleChange}
          error={formik.touched.flight && Boolean(formik.errors.flight)}
        >
          {flights.map(flight => (
            <MenuItem key={flight.id} id={flight.id} value={flight.id}>{flight.flightNo} - {flight.airline}</MenuItem>
          ))}
        </Select>
        <FormHelperText id="select-flight-helper-text">{formik.touched.flight && formik.errors.flight}</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, width: '80%' }} size="small">
        <InputLabel id="select-user-label">User</InputLabel>
        <Select
          inputProps={{ 'data-testid': 'user-field' }}
          labelId="select-user-label"
          required
          id="user-field"
          value={formik.values.user}
          label="User"
          name="user"
          size="small"
          onChange={formik.handleChange}
          error={formik.touched.user && Boolean(formik.errors.user)}
        >
          {users.map(user => (
            <MenuItem key={user.id} id={user.id} value={user.id}>{user.name} {user.surname}</MenuItem>
          ))}
        </Select>
        <FormHelperText id="select-user-helper-text">{formik.touched.user && formik.errors.user}</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, width: '80%' }} size="small">
        <InputLabel htmlFor="comment-field">Comment</InputLabel>
        <OutlinedInput
          inputProps={{ 'data-testid': 'comment-field' }}
          id="comment-field"
          required
          label="Comment"
          name="comment"
          multiline
          maxRows={4}
          minRows={2}
          size="small"
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
        />
        <FormHelperText id="comment-field">{formik.touched.comment && formik.errors.comment}</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, width: '80%' }} size="small">
        <InputLabel htmlFor="tags-field">Tags</InputLabel>
        <OutlinedInput
          id="tags-field"
          type='text'
          label="Tags"
          value={tag}
          onChange={({ target }) => setTag(target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Tags"
                onClick={addTag}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                variant="contained"
              >
                <AddIcon/>
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="tags-field-helper-text">{tags.join(' ')}</FormHelperText>
      </FormControl>
      <Button className="mb-3" id='add-comment-button' type="submit" variant="contained" size="sm" data-testid="comment-submit">Save</Button>
    </Box>
  )
}


export default CommentForm