<template>
  <div class="notes">
    <note-card title="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import NoteCard from '@/components/NoteCard.vue'

@Component({
  components: {
    NoteCard
  }
})
export default class Notes extends Vue {
  @Action('notes/createNote')
  createNote!: (payload: Note) => Promise<void>

  mounted(): void {
    this.createNote({
      title: 'task',
      tasks: [
        {
          description: 'any',
          completed: false
        }
      ]
    })
  }
}
</script>
