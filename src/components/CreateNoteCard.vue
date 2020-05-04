<template functional>
  <div class="create-note-card">
    <div class="create-note-card__wrap">
      <slot name="create-button"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class CreateNoteCard extends Vue {}
</script>
<style lang="scss">
.create-note-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  &__wrap {
    padding: 10px;
    margin: 10px;
    border-radius: 6px;
    box-shadow: 0 2px 4px #ddd;
  }
}
</style>
