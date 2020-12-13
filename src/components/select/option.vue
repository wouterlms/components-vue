<template>
  <li
    class="option"
    @click.stop="selectOption"
    :class="{
      'state-disabled': disabled,
      'state-selected': selected
    }"
  >
    <slot :selected="selected" />
  </li>
</template>

<script>
import Emitter from '@/mixins/emitter.js'

export default {
  name: 'Option',
  componentName: 'Option',
  mixins: [Emitter],

  props: {
    /** Option value */
    value: {
      type: Object,
      required: true
    }
  },

  computed: {
    disabled() {
      return this.value.disabled
    },
    selected() {
      return JSON.stringify(this.selectedOption) === JSON.stringify(this.value)
    }
  },

  data() {
    return {
      selectedOption: null
    }
  },

  mounted() {
    this.$on('optionSelected', this.handleOptionSelected)
  },
  beforeDestroy() {
    this.$off('optionSelected', this.handleOptionSelected)
  },

  methods: {
    selectOption() {
      if (!this.disabled) {
        this.dispatch('Select', 'optionClicked', this.value)
      }
    },
    handleOptionSelected(option) {
      this.selectedOption = option
    }
  }
}
</script>

<style scoped lang="scss">
.option {
  position: relative;
  padding: 0.9em;
  text-align: left;

  background: $primary-light;
  color: $primary-text;
  transition: 0.3s;

  cursor: pointer;
  user-select: none;
  overflow: hidden;

  // @include when(selected) {
  //   background: transparentize($primary-accent, 0.9);

  //   &::before {
  //     content: '';

  //     position: absolute;
  //     top: 0;
  //     left: 0;

  //     width: 3px;
  //     height: 100%;

  //     background: transparentize($primary-accent, 0.7);
  //   }
  // }

  @include when(disabled) {
    color: $input-color--disabled;
    cursor: not-allowed;

    &:hover {
      background: inherit;
    }
  }

  &:hover {
    background: transparentize($primary-accent, 0.9);
  }
}
</style>
