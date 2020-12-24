import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { createFlashcards } from '../../api/flashcards'

import Button from 'react-bootstrap/Button'

const FlashcardCreate = props => {
  // Creating the useState for the Flashcard
  const [flashcard, setFlashcard] = useState({ title: '', question: '', answer: '' })
  const [createdFlashcardId, setCreatedFlashcardId] = useState(null)

  // handling all of the changes that are being made to create flashcards
  const handleChange = event => {
    // Prevent the page from refreshing when changes are made.
    event.persist()
    setFlashcard(prevFlashcard => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedFlashcard = Object.assign({}, prevFlashcard, updatedField)
      return editedFlashcard
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = props
    // call on the api file for the axios call.
    createFlashcards({ flashcard }, user)
      .then((res) => {
        setCreatedFlashcardId(res.data.flashcard.id)
        msgAlert({
          heading: 'Successfully Created',
          message: 'Created Flashcard' + ' ' + res.data.flashcard.title,
          variant: 'success'
        })
      })
      .catch(err => {
        setFlashcard({ title: '', question: '', answer: '' })
        msgAlert({
          heading: 'Create Flashcard failed',
          message: 'Failed to create your Flashcard. See error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  if (createdFlashcardId) {
    return <Redirect to={`/flashcards/${createdFlashcardId}`} />
  }

  return (
    <React.Fragment>
      <h2>Create Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={flashcard.title}
          onChange={handleChange}
          name="title"
        />
        <input
          placeholder="Question"
          value={flashcard.question}
          onChange={handleChange}
          name="question"
        />
        <input
          placeholder="Answer"
          value={flashcard.answer}
          onChange={handleChange}
          name="answer"
        />
        <Link to={'/flashcards/'}>
          <p className="card-title">
            <Button type="submit" className="btn btn-outline-secondary create-flashcard-button">Created Flashcard</Button>
          </p>
        </Link>
      </form>
    </React.Fragment>
  )
}

export default FlashcardCreate
