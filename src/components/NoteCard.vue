<template functional>
  <div>
    <div class="note-card__wrap">
    <div class="note-card__header">
      <h3 class="note-card__title">{{ props.title }}</h3>
      <slot name="remove-btn"/>
    </div>
    <ul class="note-card__tasks">
      <li
        v-for="task in props.tasks"
        :key="task._id"
        class="note-card__task"
      >
        <input
          :checked="task.completed"
          type="checkbox"
          class="note-card__task-checkbox"
          disabled
        >
        <span class="note-card__task-description">
          {{ task.description }}
        </span>
      </li>
    </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NoteCard extends Vue {}
</script>
<style lang="scss">
.note-card {
  &__wrap {
    padding: 10px;
    margin: 10px;
    border-radius: 6px;
    box-shadow: 0 2px 4px #ddd;
    min-width: 110px;
  }

  &__header {
    border-bottom: 1px solid #eee;
    color: #666;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    margin-top: 0;
  }

  &__tasks {
    list-style: none;
    padding: 0;
  }

  &__task {
    padding: 5px 0;
  }

  &__task-checkbox {
    margin-right: 5px;
  }

  &__task-description {
    color: #666;
  }
}
</style>
