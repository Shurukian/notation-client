import React, { useState, useEffect } from 'react'
import { showFlashcards, deleteFlashcards } from '../../api/flashcards'
import { Redirect, Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

const FlashcardShow = props => {
  const [ flashcard, setFlashcard ] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    showFlashcards(user, match.params.id)
      .then(res => {
        setFlashcard(res.data.flashcard)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Flashcard Successful',
          message: 'See the Flashcard here!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Flashcard has Failed.',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteFlashcards(user, match.params.id)
      .then(() => setDeleted(true))
      .then(() => {
        msgAlert({
          heading: 'Flashcard has been Deleted',
          message: 'Back to the list of flashcards that exist',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to={
        { pathname: '/flashcards/', state: { msg: 'Flashcard Successfully Deleted!' } }
      } />
    )
  }

  return (
    <div className="row">
      {flashcard ? (
        <div className="show-card card col-12">
          <div className="card-body">
            <h3 className="card-title">{flashcard.title}</h3>
            <h5 className="card-text">{flashcard.question}</h5>
            <p className="card-text">{flashcard.answer}</p>
          </div>
          <div className="card-footer bg-transparent border-dark">
            <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
            <Link to={`/flashcards-update/${flashcard.id}`}>
              <Button className="btn btn-outline-dark flashcard-button">Update</Button>
            </Link>
          </div>
        </div>
      ) : 'Finding cards...'}
    </div>
  )
}

export default FlashcardShow
