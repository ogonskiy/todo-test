<template functional>
  <div class="note-card">
    <h3>{{ props.title }}</h3>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NoteCard extends Vue {

}
</script>
<style lang="scss">
</style>
