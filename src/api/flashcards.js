import apiUrl from '../apiConfig'
import axios from 'axios'

export const createFlashcards = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/flashcards/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: data
  })
}

export const indexFlashcards = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/flashcards/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showFlashcards = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/flashcards/' + id,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateFlashcards = (data, user, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/flashcards/${id}`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: data
  })
}

export const deleteFlashcards = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/flashcards/' + id,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
