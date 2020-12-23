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
