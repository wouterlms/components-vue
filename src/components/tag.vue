<template>
  <div class="el-tag" @click="remove" :style="tagStyle" :class="{ 'state-disabled': disabled, 'state-error': error }">
    <span>
      <slot />
    </span>
    <iconEl icon="close" width=".5rem" />
  </div>
</template>

<script>
import iconEl from './icon'

export default {
  components: {
    iconEl
  },
  props: {
    showRemove: Boolean,
    singleLine: Boolean,
    disabled: Boolean,
    error: Boolean
  },
  computed: {
    tagStyle() {
      return {
        marginBottom: this.singleLine ? 0 : '.4rem'
      }
    }
  },
  methods: {
    remove() {
      if (!this.disabled) {
        this.$emit('remove')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-tag {
  display: flex;
  align-items: center;

  padding: $input-padding / 2;
  margin-right: 0.3rem;

  font-size: $font-xs;

  background: $tag-background-color;
  border: 1px solid $tag-border-color;
  border-radius: $border-radius;

  user-select: none;
  white-space: nowrap;

  cursor: pointer;

  @include when(disabled) {
    cursor: not-allowed;
  }

  @include when(error) {
    border-color: $error;
  }

  svg {
    margin-left: 0.3rem;
  }
}
</style>
