<template>
  <li class="el-option" @click.stop="selectOption">
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

  methods: {
    selectOption() {
      this.dispatch('elSelect', 'handleOptionClick', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.el-option {
  padding: 0.7rem;
  text-align: left;

  background: $select-option-background;
  transition: 0.3s;

  cursor: pointer;

  &:hover {
    background: $select-option-background--hover;
  }
}
</style>
