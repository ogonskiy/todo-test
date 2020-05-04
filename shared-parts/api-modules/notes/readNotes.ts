import apiClient from '../../../shared-parts/apiClient'

type ReadNotes = () => Promise<ReadNoteResponse[]>

const URL = '/notes'

const readNotes: ReadNotes = async() => {
  const { data }: { data: ReadNoteResponse[] } = await apiClient.get(URL)
  return data
}

export { readNotes }
