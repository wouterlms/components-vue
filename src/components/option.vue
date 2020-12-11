<template>
  <li
    class="option"
    @click.stop="selectOption"
    :class="{
      'state-disabled': disabled
    }"
  >
    <slot />
  </li>
</template>

<script>
import Emitter from '@/mixins/emitter.js'
export default {
  mixins: [Emitter],

  props: {
    value: Object
  },

  computed: {
    disabled() {
      return this.value.disabled
    }
  },

  methods: {
    selectOption() {
      if (!this.disabled) {
        this.dispatch('elSelect', 'handleOptionClick', this.value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.option {
  padding: 0.9em;
  text-align: left;

  background: $primary-light;
  color: $primary-text;
  transition: 0.3s;

  cursor: pointer;
  user-select: none;

  @include when(disabled) {
    color: $input-color--disabled;
    cursor: not-allowed;

    &:hover {
      background: inherit;
    }
  }

  &:hover {
    background: #f5f7fa;
  }
}
</style>
