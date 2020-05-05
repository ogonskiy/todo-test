<template>
  <div class="note">
    <div
      v-if="note"
      class="note__card"
    >
      <note-form
        :note-data="note"
        @form-update="updateForm"
      >
        <template v-slot:header-right>
          <button
            class="note__remove-btn"
            @click="toggleRemovalModal"
          >
            <img
              src="../assets/trash-alt-regular.svg"
              alt="remove"
            >
          </button>
        </template>
      </note-form>
      <div class="note__bottom-buttons">
        <button
          @click="submitForm"
        >
          Update
        </button>
        <button
          class="note__cancel-button"
          @click="routeToNotes"
        >
          Cancel
        </button>
      </div>
    </div>

    <modal v-if="isNoteRemovalModalShown">
      <template v-slot:header>
        <h3>Are you sure?</h3>
      </template>
      <template v-slot:footer>
        <div class="note__bottom-buttons">
          <button
            @click="removeNote"
          >
            Yes
          </button>
          <button
            class="note__cancel-button"
            @click="toggleRemovalModal"
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
import { Action } from 'vuex-class'
import Modal from '@/components/Modal.vue'
import NoteForm from '@/components/NoteForm.vue'

@Component({
  components: {
    NoteForm,
    Modal
  }
})
export default class NotePage extends Vue {
  @Action('notes/fetchNote')
  fetchNote!: (payload: ReadNotePayload) => Promise<ReadNoteResponse>

  @Action('notes/deleteNote')
  deleteNote!: (payload: DeleteNotePayload) => Promise<void>

  @Action('notes/updateNote')
  updateNote!: (payload: UpdateNotePayload) => Promise<void>

  note: Note | null = null

  noteId = ''

  updateNotePayload: Note | null = null

  isNoteRemovalModalShown = false

  toggleRemovalModal(): void {
    this.isNoteRemovalModalShown = !this.isNoteRemovalModalShown
  }

  routeToNotes() {
    this.$router.push('/')
  }

  updateForm(formData: Note) {
    this.updateNotePayload = formData
  }

  async submitForm(): Promise<void> {
    if (!this.updateNotePayload || !this.updateNotePayload.title) return
    try {
      await this.updateNote({
        id: this.noteId,
        ...this.updateNotePayload
      })
      this.routeToNotes()
    } catch (error) {
      // TODO: add error handler
    }
  }

  async removeNote(): Promise<void> {
    try {
      await this.deleteNote({ id: this.noteId })
      this.toggleRemovalModal()
      this.routeToNotes()
    } catch (error) {
      // TODO: add error handler
    }
  }

  async mounted() {
    this.noteId = this.$route.params.id
    try {
      const { title, tasks } = await this.fetchNote({ id: this.noteId })
      this.note = {
        title,
        tasks: tasks.map((task: ReadNoteTaskResponse): NoteTask => ({
          description: task.description,
          completed: task.completed
        }))
      }
    } catch (error) {
      // TODO: add error handler
    }
  }
}
</script>
<style lang="scss">
.note {
  display: flex;
  justify-content: center;
  padding: 40px;

  &__card {
    max-width: 500px;
    width: 100%;
    padding: 30px;
    margin: 10px;
    border-radius: 6px;
    box-shadow: 0 2px 4px #ddd;
  }

  &__cancel-button {
    border: 2px solid rgb(207, 132, 132);
  }

  &__bottom-buttons {
    display: flex;
    justify-content: space-between;
  }

  &__remove-btn {
    padding: 0;
    border: 0;
    width: 18px;
  }
}
</style>
