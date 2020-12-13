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
      @click.native="onInputClick"
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
        :position="position"
        align-arrow="right"
        arrow-offset=".5em"
        :margin="computedMargin"
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
import inputElement from '../input'
import tooltipElement from '../tooltip'
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
    /** Object array of options, for advanced options use the <option> component */
    options: Array,

    /** Select value */
    value: Object,

    /** Native placeholder */
    placeholder: String,

    /** Icon */
    icon: String,

    /** Show select loader */
    loading: Boolean,

    /** Title */
    title: String,

    /** Error */
    error: String,

    /** Property used to display the value */
    label: {
      type: String,
      required: true
    },

    /** Disable the select input */
    disabled: Boolean,

    /** Show border */
    border: {
      type: Boolean,
      default: true
    },

    /** Position of tooltip (see <tooltip>) */
    position: {
      type: String,
      default: 'bottom'
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
    },
    computedMargin() {
      if (this.position === 'bottom') return '0.625em'
      return '3.8em'
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
      this.showSelectMenu = this.disabled || this.loading ? false : !this.showSelectMenu
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
