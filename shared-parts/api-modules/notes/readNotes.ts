import apiClient from '../../../shared-parts/apiClient'

type ReadNotes = () => Promise<Note[]>

const URL = '/notes'

const readNotes: ReadNotes = async() => {
  const response: Note[] = await apiClient.get(URL)
  return response
}

export { readNotes }
