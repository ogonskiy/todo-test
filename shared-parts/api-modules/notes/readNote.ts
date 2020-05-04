import apiClient from '../../../shared-parts/apiClient'

type ReadNote = (payload: ReadNotePayload) => Promise<Note>

const getUrl = (id: string): string => `/notes/${id}`

const readNote: ReadNote = async({ id }) => {
  const response: Note = await apiClient.get(getUrl(id))
  return response
}

export { readNote }
