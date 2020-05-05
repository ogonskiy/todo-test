<template>
  <div class="notes">
    <note-card
      v-for="note in formattedNotes"
      :key="note._id"
      :title="note.title"
      :tasks="note.tasks"
    >
      <template v-slot:remove-btn>
        <button
          class="notes__remove-btn"
          @click="openRemoveNoteModal(note._id)"
        >
          ✕
        </button>
      </template>
    </note-card>
    <create-note-card>
      <template v-slot:create-button>
        <button
          class="notes__create-button"
          @click="toggleNoteCreationModal"
        >
          +
        </button>
      </template>
    </create-note-card>
    <modal v-if="isNoteCreationFormShown">
      <template v-slot:body>
        <note-form @form-update="updateCreationForm"/>
      </template>
      <template v-slot:footer>
        <div class="notes__modal-bottom-buttons">
          <button
            @click="submitForm"
          >
            Create
          </button>
          <button
            @click="toggleNoteCreationModal"
            class="notes__modal-cancel-button"
          >
            Cancel
          </button>
        </div>
      </template>
    </modal>

    <modal v-if="isNoteRemovalModalShown">
      <template v-slot:header>
        <h3>Are you sure?</h3>
      </template>
      <template v-slot:footer>
        <div class="notes__modal-bottom-buttons">
          <button
            @click="removeNote"
          >
            Yes
          </button>
          <button
            @click="closeRemovalModal"
          >
            Cancel
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import NoteCard from '@/components/NoteCard.vue'
import CreateNoteCard from '@/components/CreateNoteCard.vue'
import Modal from '@/components/Modal.vue'
import NoteForm from '@/components/NoteForm.vue'

@Component({
  components: {
    NoteCard,
    CreateNoteCard,
    Modal,
    NoteForm
  }
})
export default class Notes extends Vue {
  @Action('notes/fetchNotes')
  fetchNotes!: () => Promise<void>

  @State(state => state.notes.notes)
  notes!: ReadNoteResponse[]

  @Action('notes/createNote')
  createNote!: (payload: Note) => Promise<void>

  @Action('notes/deleteNote')
  deleteNote!: (payload: DeleteNotePayload) => Promise<void>

  isNoteCreationFormShown = false

  isNoteRemovalModalShown = false

  removeNoteId = ''

  get formattedNotes(): ReadNoteResponse[] {
    return this.notes.map(({ tasks, ...restNote }: ReadNoteResponse): ReadNoteResponse => ({
      ...restNote,
      tasks: tasks.slice(0, 3)
    }))
  }

  createNoteForm: Note = {
    title: '',
    tasks: []
  }

  updateCreationForm(formData: Note) {
    this.createNoteForm = formData
  }

  toggleNoteCreationModal(): void {
    this.isNoteCreationFormShown = !this.isNoteCreationFormShown
  }

  openRemoveNoteModal(id: string) {
    this.removeNoteId = id
    this.isNoteRemovalModalShown = true
  }

  closeRemovalModal() {
    this.isNoteRemovalModalShown = false
  }

  async submitForm(): Promise<void> {
    if (!this.createNoteForm.title) return
    try {
      await this.createNote(this.createNoteForm)
      this.toggleNoteCreationModal()
      await this.fetchNotes()
    } catch (error) {
      // TODO: add error handler
    }
  }

  async removeNote(): Promise<void> {
    try {
      await this.deleteNote({ id: this.removeNoteId })
      this.closeRemovalModal()
      await this.fetchNotes()
    } catch (error) {
      // TODO: add error handler
    }
  }

  async mounted(): Promise<void> {
    try {
      await this.fetchNotes()
    } catch (error) {
      // TODO: add error handler
    }
  }
}
</script>
<style lang="scss">
.notes {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;

  &__remove-btn {
    height: 25px;
    width: 25px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    padding-bottom: 5px;
  }

  &__create-button {
    border-radius: 50%;
    padding: 0;
    margin: 0;
    width: 32px;
    height: 32px;
    border: 2px solid #ada;
    background-color: #fff;
    font-size: 23px;
    line-height: 23px;
    color: #ada;
    cursor: pointer;
  }

  &__modal-cancel-button {
    border: 2px solid rgb(207, 132, 132);
  }

  &__modal-bottom-buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
