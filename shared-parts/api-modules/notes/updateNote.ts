import apiClient from '../../../shared-parts/apiClient'

type UpdateNote = (payload: UpdateNotePayload) => Promise<void>

const getUrl = (id: string): string => `/notes/${id}`

const updateNote: UpdateNote = async(
  { id, ...restPayload }
) => {
  await apiClient.patch(getUrl(id), restPayload)
}

export { updateNote }
