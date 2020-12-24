import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexFlashcards } from '../../api/flashcards'
import messages from '../AutoDismissAlert/messages'

import Button from 'react-bootstrap/Button'

const FlashcardIndex = props => {
  const [flashcardArray, setFlashcardArray] = useState(null)

  useEffect(() => {
    const { user, msgAlert } = props
    indexFlashcards(user)
      .then((res) => {
        setFlashcardArray(res.data.flashcards)
      })
      .then(() => {
        msgAlert({
          heading: 'Flashcard Index Success',
          message: 'See all of the Created Flashcards here!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Flashcard Index Failed with error: ' + err.message,
          message: messages.indexFlashcardFailure,
          variant: 'danger'
        })
      })
  }, [])

  if (!flashcardArray) {
    return 'Loading...'
  } else if (flashcardArray.length === 0) {
    return (
      'No Flashcards to Display'
    )
  } else {
    return (
      <React.Fragment>
        <div className="card-deck">
          {flashcardArray.map(flashcard => (
            <div className="card" key={flashcard.id}>
              <div className="card-body">
                <h3 className="card-title">{flashcard.title}</h3>
                <h5 className="card-text">{flashcard.question}</h5>
                <p className="card-text">{flashcard.answer}</p>
              </div>
              <div className="card-footer">
                <Link to={`/flashcards-show/${flashcard.id}`}>
                  <Button className="btn btn-outline-dark flashcard-button">Edit</Button>
                </Link>
                <small className="text-muted"></small>
              </div>
            </div>
          ))}
          <Link to={'/flashcards/'}>
            <div>
              <br />
              <br />
              <br />
              <Link to={'/flashcards/'}><p className="card-title">
                <Button className="btn btn-outline-dark flashcard-button">+</Button>
              </p></Link>
            </div>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

export default FlashcardIndex
