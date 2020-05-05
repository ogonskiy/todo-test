import { MutationTree, ActionTree } from 'vuex'
import * as api from '../../shared-parts/api-modules/notes'

type NotesState = {
  notes: ReadNoteResponse[];
}

const state: NotesState = {
  notes: []
}

const MUTATIONS = {
  SET_NOTES: 'SET_NOTES'
}

const mutations: MutationTree<NotesState> = {
  [MUTATIONS.SET_NOTES](state, notes: ReadNoteResponse[]) {
    state.notes = notes
  }
}

const actions: ActionTree<NotesState, any> = {
  async fetchNotes({ commit }): Promise<void> {
    const notes: ReadNoteResponse[] = await api.readNotes()
    commit(MUTATIONS.SET_NOTES, notes)
  },

  async fetchNote(_ctx, payload: ReadNotePayload): Promise<ReadNoteResponse> {
    const response: ReadNoteResponse = await api.readNote(payload)
    return response
  },

  async createNote(_ctx, payload: Note): Promise<void> {
    await api.createNote(payload)
  },
  async updateNote(_ctx, payload: UpdateNotePayload): Promise<void> {
    await api.updateNote(payload)
  },
  async deleteNote(_ctx, payload: DeleteNotePayload): Promise<void> {
    await api.deleteNote(payload)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
