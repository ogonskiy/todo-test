<template>
  <div class="note-form">
    <div class="note-form__header">
      <input
        v-if="allowEditTitle"
        v-model="noteForm.title"
        type="text"
        class="note-form__header-input"
        placeholder="Note title..."
        @blur="doneEditTitle"
        @keyup.enter="doneEditTitle"
        @keyup.esc="cancelEditTitle"
      >
      <h3
        v-else
        @dblclick="editTitle"
      >
        {{ noteForm.title }}
      </h3>
      <slot name="header-right"/>
    </div>
    <div class="note-form__input-wrap">
      <div>
        <button
          :disabled="!undoTasksCache.length"
          title="undo"
          class="note-form__navigation-button"
          @click="undo"
        >
          <img
            src="../assets/undo-solid.svg"
            alt="undo"
          >
        </button>
        <button
          :disabled="!redoTasksCache.length"
          title="redo"
          class="note-form__navigation-button"
          @click="redo"
        >
          <img
            src="../assets/redo-solid.svg"
            alt="redo"
          >
        </button>
      </div>
      <input
        v-model="inputText"
        type="text"
        class="note-form__input"
        placeholder="Leave your todo..."
        @keyup.enter="addTask"
      >
      <button
        class="note-form__add-button"
        @click="addTask"
      >
        Add
      </button>
    </div>
    <ul class="note-form__tasks">
      <li
        v-for="(task, index) in noteForm.tasks"
        :key="`note-form__task--${index}`"
        :class="{ 'note-form__task--completed': task.completed }"
        class="note-form__task"
      >
        <input
          type="checkbox"
          class="note-form__checkbox"
          v-model="task.completed"
        >
        <input
          v-if="editedTaskIndex === index"
          type="text"
          class="note-form__task-description"
          v-model="task.description"
          @blur="doneEditTask"
          @keyup.enter="doneEditTask"
          @keyup.esc="cancelEditTask"
        >
        <label
          v-else
          class="note-form__checkbox-label"
          @dblclick="editTask(task.description, index)"
        >
          {{ task.description }}
        </label>
        <button
          class="note-form__remove-btn"
          @click="removeTask(index)"
        >
          ✕
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { clone } from 'ramda'

const AMOUNT_OF_ELEMENTS_TO_REMOVE = 1
const EMPTY_STRING = ''

@Component
export default class NoteForm extends Vue {
  @Prop({ type: Object, default: null })
  noteData!: Note | null

  @Watch('noteData', { immediate: true })
  noteDataChanged(noteData: Note | null) {
    if (!noteData) return
    this.noteForm = clone(noteData)
  }

  inputText = ''

  allowEditTitle = false

  noteForm: Note = {
    title: '',
    tasks: []
  }

  @Watch('noteForm', { deep: true })
  onTasksUpdated(noteForm: Note): void {
    if (this.shouldUpdateUndoCache) {
      this.undoTasksCache.push(clone(noteForm))
      this.redoTasksCache = []
    } else {
      this.shouldUpdateUndoCache = true
    }
    this.$emit('form-update', noteForm)
  }

  undoTasksCache: Note[] = []

  redoTasksCache: Note[] = []

  beforeEditTaskCache = EMPTY_STRING

  beforeEditTitleCache = EMPTY_STRING

  editedTaskIndex: number | null = null

  shouldUpdateUndoCache = true

  _keyListener: any = null

  editTitle(): void {
    this.beforeEditTitleCache = this.noteForm.title
    this.allowEditTitle = true
  }

  doneEditTitle(): void {
    if (this.noteForm.title === EMPTY_STRING) return
    this.allowEditTitle = false
  }

  cancelEditTitle(): void {
    this.noteForm.title = this.beforeEditTitleCache
    this.doneEditTitle()
  }

  readLastUndoState(): void {
    const previousTasksState: Note = clone(this.undoTasksCache[this.undoTasksCache.length - 1]) ||
      this.noteData || { title: '', tasks: [] }
    this.shouldUpdateUndoCache = false
    this.noteForm.tasks = previousTasksState.tasks
    this.noteForm.title = previousTasksState.title
  }

  undo(): void {
    if (!this.undoTasksCache.length) return
    const currentTasksState: Note = this.undoTasksCache.pop() as Note
    this.redoTasksCache.push(currentTasksState)
    this.readLastUndoState()
  }

  redo(): void {
    if (!this.redoTasksCache.length) return
    const currentTasksState: Note = this.redoTasksCache.pop() as Note
    this.undoTasksCache.push(currentTasksState)
    this.readLastUndoState()
  }

  editTask(description: string, index: number) {
    this.beforeEditTaskCache = description
    this.editedTaskIndex = index
  }

  doneEditTask(): void {
    this.editedTaskIndex = null
  }

  cancelEditTask(): void {
    if (this.editedTaskIndex === null) return
    this.noteForm.tasks[this.editedTaskIndex].description = this.beforeEditTaskCache
    this.doneEditTask()
  }

  addTask(): void {
    if (this.inputText === EMPTY_STRING) return
    this.noteForm.tasks.push({
      description: this.inputText,
      completed: false
    })
    this.inputText = EMPTY_STRING
  }

  removeTask(index: number): void {
    this.noteForm.tasks.splice(index, AMOUNT_OF_ELEMENTS_TO_REMOVE)
    if (this.editedTaskIndex) this.editedTaskIndex = null
  }

  mounted() {
    this._keyListener = function(e: any) {
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        this.undo()
      }
      if (e.which === 90 && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault()
        this.redo()
      }
    }

    document.addEventListener('keydown', this._keyListener.bind(this))

    if (this.noteForm.title === EMPTY_STRING) {
      this.allowEditTitle = true
    }
  }

  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener)
  }
}
</script>

<style lang="scss">
.note-form {
  margin: 0 0 20px;

  &__input-wrap {
    display: flex;
    justify-content: space-between;
  }

  &__input {
    margin-right: 10px;
  }

  &__navigation-button {
    width: 20px;
    height: 20px;
    padding: 3px;
    margin: 2px;
    border: 0;
    background: transparent;
    cursor: pointer;

    &[disabled] {
      opacity: 0.6;
      cursor: default;
    }
  }

  &__header {
    margin-top: 0;
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
    }

    &-input {
      font-size: 16px;
      border: 0;
    }
  }

  &__tasks {
    list-style: none;
    padding: 0;
  }

  &__task {
    display: flex;
    position: relative;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      width: 13px;
      height: 13px;
      background-color: #eee;
      border: 1px solid #aaa;
      border-radius: 50%;
      top: 3px;
      left: 4px;
    }

    &--completed {
      &::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 5px;
        border-bottom: 2px solid rgb(106, 207, 106);
        border-left: 2px solid rgb(106, 207, 106);
        transform: rotateZ(-45deg);
        top: 3.5px;
        left: 7px;
      }
    }
  }

  &__checkbox {
    position: relative;
    width: 16px;
    height: 16px;
    opacity: 0;
    z-index: 3;
  }

  &__checkbox-label {
    margin-left: 10px;
    margin-right: 10px;
  }

  &__remove-btn {
    border: 0;
  }
}
</style>
