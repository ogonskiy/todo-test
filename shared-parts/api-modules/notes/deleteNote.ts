import apiClient from '../../../shared-parts/apiClient'

type DeleteNote = (payload: DeleteNotePayload) => Promise<void>

const getUrl = (id: string): string => `/notes/${id}`

const deleteNote: DeleteNote = async({ id }) => {
  await apiClient.delete(getUrl(id))
}

export { deleteNote }
