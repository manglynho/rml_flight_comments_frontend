import React from 'react'
import MUIDataTable from 'mui-datatables'
import { LinearProgress , Box } from '@mui/material'

const CommentsList = ({ commentsStore }) => {

  if(commentsStore.length === 0) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  }

  let tableTitle = 'Comments for All Flights'

  if(commentsStore.flight){
    tableTitle = `Comments for ${commentsStore.flight.flightNo} - ${commentsStore.flight.airline}`
  }

  const columns = [ 'id', 'User', 'Flight', 'Comment', 'Tags' ]
  const data = commentsStore.comments.map(comment => {
    return [
      comment.id,
      comment.user.name,
      comment.flight.flightNo,
      comment.comment,
      comment.tags.map(tag => tag).join(', ')
    ]
  })

  const options = {
    filterType: 'checkbox',
    elevation: 0,
    variant:'outlined',
    selectableRowsHeader: false,
    selectableRows: 'none',
    responsive: 'standard'
  }

  return (
    <MUIDataTable
      title={tableTitle}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default CommentsList