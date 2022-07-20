import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CommentForm from './CommentForm'
import initialFlights from '../../data/initialFlights'
import initialUsers from '../../data/initialUsers'

test('<CommentForm /> inputs data and calls onSubmit', async () => {
  const createComment = jest.fn()

  render(
    <CommentForm createComment={createComment} flights={initialFlights} users={initialUsers}/>
  )

  const flight = screen.getByTestId('flight-field')
  const user = screen.getByTestId('user-field')
  const comment = screen.getByTestId('comment-field')
  const submit = screen.getByTestId('comment-submit')

  fireEvent.change(flight, {
    target: { value: '5a422a851b54a676234d1898' }
  })
  fireEvent.change(user, {
    target: { value: '5a422aa71b54a676234d17f8' }
  })
  fireEvent.change(comment, {
    target: { value: 'Ok, here is my comment' }
  })
  fireEvent.click(submit)

  await waitFor(() => {
    expect(createComment.mock.calls).toHaveLength(1)
    expect(createComment.mock.calls[0][0].flight).toBe('5a422a851b54a676234d1898' )
    expect(createComment.mock.calls[0][0].user).toBe('5a422aa71b54a676234d17f8' )
    expect(createComment.mock.calls[0][0].comment).toBe('Ok, here is my comment' )
  })
})