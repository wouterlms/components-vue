<template>
  <div
    class="el-select"
    :class="{
      'state-loading': loading,
      'state-disabled': disabled,
      'state-error': error,
      'state-focused': showSelectMenu
    }"
  >
    <inputEl
      :icon="icon"
      :placeholder="placeholder"
      :loading="loading"
      :disabled="disabled"
      :title="title"
      :error="error"
      suffix-icon="chevron-down"
      readonly
      v-click-outside="() => (showSelectMenu = false)"
      v-model="computedValue"
      @mouseup.native="onInputClick"
    >
      <!-- prepend -->
      <template slot="prepend">
        <slot name="prepend" />
      </template>

      <!-- append -->
      <template slot="append">
        <slot name="append" />
      </template>
    </inputEl>

    <transition name="tooltip">
      <tooltipEl
        v-if="showSelectMenu"
        arrow-align="right"
        arrow-offset=".9rem"
        margin="10px"
        width="100%"
        class="el-select__options"
      >
        <ul v-if="options && options.length">
          <optionEl v-for="option of options" :key="option[label]" @click="select(option)">
            {{ option[label] }}
          </optionEl>
        </ul>

        <ul v-else>
          <slot />
        </ul>
      </tooltipEl>
    </transition>
  </div>
</template>

<script>
import inputEl from './input'
import tooltipEl from './tooltip'
import optionEl from './option'

export default {
  name: 'elSelect',
  componentName: 'elSelect',
  components: {
    inputEl,
    tooltipEl,
    optionEl
  },
  props: {
    options: Array,
    value: Object,
    placeholder: String,
    icon: String,
    loading: Boolean,
    title: String,
    error: String,
    label: {
      type: String,
      required: true
    },
    disabled: Boolean
  },
  data() {
    return {
      showSelectMenu: false
    }
  },
  computed: {
    computedValue() {
      if (!this.value) {
        return null
      }
      return this.value[this.label]
    }
  },
  mounted() {
    this.$on('handleOptionClick', this.select)
  },
  beforeDestroy() {
    this.$off('handleOptionClick', this.select)
  },
  methods: {
    onInputClick() {
      this.showSelectMenu = this.disabled ? false : !this.showSelectMenu
    },
    select(option) {
      this.$emit('input', option)
      this.showSelectMenu = false
    }
  }
}
</script>

<style scoped lang="scss">
.el-select {
  position: relative;
  line-height: 1;

  ::v-deep .el-input__content__suffix-icon svg {
    width: 0.8rem !important;
    transition: 0.3s;
  }

  @include when(loading) {
    cursor: not-allowed;
  }

  @include when(disabled) {
    cursor: not-allowed;
  }

  @include when(focused) {
    ::v-deep .el-input__content__suffix-icon svg {
      transform: rotate(-180deg);
    }
  }

  &__options {
    position: relative;
    z-index: 1;

    ul {
      max-height: 300px;
      overflow: scroll;
    }
  }
}

.tooltip {
  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: 0.5s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }
  &-enter-active {
    opacity: 0;
  }
  &-leave-active {
    opacity: 1;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
