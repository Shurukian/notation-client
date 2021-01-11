import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showFlashcards, updateFlashcards } from '../../api/flashcards'

// import Button from 'react-bootstrap/Button'

const FlashcardUpdate = props => {
  const [flashcard, setFlashcard] = useState({ title: '', question: '', answer: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    showFlashcards(user, match.params.id)
      .then(res => setFlashcard(res.data.flashcard))
      .then(() => msgAlert({
        heading: 'Flashcard Show Success',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Flashcard Show Failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleUpdateChange = e => {
    const updatedField = { [e.target.name]: e.target.value }
    setFlashcard(oldFlashcard => {
      const updatedFlashcard = { ...oldFlashcard, ...updatedField }
      return updatedFlashcard
    })
  }

  const handleUpdateSubmit = e => {
    e.preventDefault()

    updateFlashcards({ flashcard }, user, match.params.id)

      .then(() => setUpdated(true))
      .then(() => {
        return msgAlert({
          heading: 'Successfully updated',
          message: 'Updated Flashcard',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Update Flashcardfailed with the error: ' + err.message,
          message: 'Update Flashcard has failed, Please try again',
          variant: 'danger'
        })
      })
  }

  if (updated) {
    return (
      <Redirect to={'/flashcards/index'} />
    )
  }

  return (
    <React.Fragment>
      <h2>Update Flashcard</h2>
      <form onSubmit={handleUpdateSubmit}>
        <input
          placeholder="Title"
          value={flashcard.title}
          onChange={handleUpdateChange}
          name="title"
        />
        <br />
        <br />
        <textarea
          placeholder="Question"
          value={flashcard.question}
          onChange={handleUpdateChange}
          name="question"
        />
        <br />
        <textarea
          placeholder="Answer"
          value={flashcard.answer}
          onChange={handleUpdateChange}
          name="answer"
        />
        <br />
        <button type="submit" className="flashcard-button update-flashcard-button">
            Update Flashcard
        </button>
      </form>
    </React.Fragment>
  )
}

export default FlashcardUpdate
