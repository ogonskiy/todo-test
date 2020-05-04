import apiClient from '../../../shared-parts/apiClient'

type CreateNote = (payload: Note) => Promise<void>

const URL = '/notes'

const createNote: CreateNote = async payload => {
  await apiClient.post(URL, payload)
}

export { createNote }
