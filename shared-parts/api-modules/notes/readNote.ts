import apiClient from '../../../shared-parts/apiClient'

type ReadNote = (payload: ReadNotePayload) => Promise<ReadNoteResponse>

const getUrl = (id: string): string => `/notes/${id}`

const readNote: ReadNote = async({ id }) => {
  const { data }: { data: ReadNoteResponse } = await apiClient.get(getUrl(id))
  return data
}

export { readNote }
