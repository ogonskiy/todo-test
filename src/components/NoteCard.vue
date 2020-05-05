<template functional>
  <div class="note-card">
    <div class="note-card__wrap">
    <div class="note-card__header">
      <h3
        class="note-card__title"
        @click="parent.$router.push(`/${props._id}`)"
      >{{ props.title }}</h3>
      <slot name="remove-btn"/>
    </div>
    <ul class="note-card__tasks">
      <li
        v-for="task in props.tasks"
        :key="task._id"
        :class="{ 'note-card__task--completed': task.completed }"
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
    transition: transform 0.25s, box-shadow 0.25s;
    min-width: 110px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    }
  }

  &__header {
    border-bottom: 1px solid #eee;
    color: #666;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    margin-top: 0;
    cursor: pointer;
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

  &__task-checkbox {
    position: relative;
    width: 16px;
    height: 16px;
    opacity: 0;
    z-index: 3;
  }

  &__task-description {
    margin-left: 10px;
  }
}
</style>
