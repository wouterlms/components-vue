<template>
  <div class="modal">
    <!-- overlay -->
    <transition name="overlay">
      <div v-if="show" class="modal__overlay" @click="clickOutside"></div>
    </transition>

    <transition name="modal">
      <div v-if="show" class="modal__content">
        <icon-element
          v-if="showClose && !requiresAction"
          @click.native="close"
          icon="close"
          class="modal__content__close"
        />

        <!-- slot content -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import iconElement from './icon'

export default {
  components: {
    iconElement
  },
  props: {
    requiresAction: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    show: Boolean
  },
  data() {
    return {}
  },
  methods: {
    clickOutside() {
      if (this.requiresAction) {
      } else {
        this.close()
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: relative;
  z-index: 99;

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: rgba(0, 0, 0, 0.4);
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;

    min-width: 200px;
    padding: 2em 2em 1.5em 1.5em;

    background: $primary-light;
    border-radius: $border-radius-lg;
    box-shadow: $box-shadow;

    transform: translate(-50%, -50%);

    &__close {
      position: absolute;
      top: 0.8em;
      right: 0.8em;

      width: 0.6rem !important;
      height: 0.7rem !important;

      cursor: pointer;
      user-select: none;
    }
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.4s cubic-bezier(0.17, 0.67, 0.16, 0.99);
}
.overlay-enter,
.overlay-leave-to {
  opacity: 0;
}

.modal {
  &-enter-active,
  &-leave-active {
    transition: 0.4s cubic-bezier(0.22, 0.68, 0, 1.51);
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.05) !important;
  }
}
</style>
