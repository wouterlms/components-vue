<template>
  <div
    class="select"
    :class="{
      'state-loading': loading,
      'state-disabled': disabled,
      'state-error': error,
      'state-focused': showSelectMenu
    }"
  >
    <input-element
      :icon="icon"
      :placeholder="placeholder"
      :loading="loading"
      :disabled="disabled"
      :title="title"
      :error="error"
      :border="border"
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
    </input-element>

    <transition name="tooltip">
      <tooltip-element
        v-if="showSelectMenu"
        arrow-align="right"
        arrow-offset=".8em"
        margin="0.625em"
        width="100%"
        class="select__options"
      >
        <ul v-if="options && options.length">
          <option-element v-for="option of options" :value="option" :key="option[label]" :disabled="option.disabled">
            {{ option[label] }}
          </option-element>
        </ul>

        <ul v-else>
          <slot />
        </ul>
      </tooltip-element>
    </transition>
  </div>
</template>

<script>
import inputElement from './input'
import tooltipElement from './tooltip'
import optionElement from './option'

import emitter from '@/mixins/emitter'

export default {
  name: 'Select',
  componentName: 'Select',
  components: {
    inputElement,
    tooltipElement,
    optionElement
  },
  mixins: [emitter],
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
    disabled: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showSelectMenu: false,
      selectedOption: null
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
  watch: {
    showSelectMenu: function(show) {
      if (show) {
        this.$nextTick(() => {
          this.broadcast('Option', 'optionSelected', this.selectedOption)
        })
      }
    }
  },
  mounted() {
    this.$on('optionClicked', this.select)
  },
  beforeDestroy() {
    this.$off('optionClicked', this.select)
  },
  methods: {
    onInputClick() {
      this.showSelectMenu = this.disabled ? false : !this.showSelectMenu
    },
    select(option) {
      this.$emit('input', option)
      this.showSelectMenu = false
      this.selectedOption = option
    }
  }
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  line-height: 1;

  ::v-deep .input__content__suffix-icon svg {
    width: 0.8em !important;
    transition: 0.3s;
  }

  @include when(loading) {
    cursor: not-allowed;
  }

  @include when(disabled) {
    cursor: not-allowed;
  }

  @include when(focused) {
    ::v-deep .input__content__suffix-icon svg {
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
    pointer-events: none;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
