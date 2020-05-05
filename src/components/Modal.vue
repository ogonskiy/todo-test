<template functional>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">

          <div class="modal__header">
            <slot name="header"/>
          </div>

          <div class="modal__body">
            <slot name="body"/>
          </div>

          <div class="modal__footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {}
</script>

<style lang="scss">
.modal {
  &__mask {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: monospace;
    border-radius: 6px;
  }

  &__header h3 {
    margin-top: 0;
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  &-enter {
    opacity: 0;
  }

  &-leave-active {
    opacity: 0;
  }

  &-enter &__container,
  &-leave-active &__container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
