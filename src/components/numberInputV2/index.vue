<template>
  <input-element
    class="number-input"
    type="text"
    v-model="modifiedValue"
    :disabled="disabled"
    :title="title"
    :error="error"
    :class="{ 'state-disabled': disabled }"
  >
    <template slot="prepend">
      <span role="button" @click.prevent="decrease" :disabled="disabled">
        -
      </span>
    </template>
    <template slot="append">
      <span role="button" @click.prevent="increase" :disabled="disabled">
        +
      </span>
    </template>
  </input-element>
</template>

<script>
import inputElement from '../input'

export default {
  components: {
    inputElement
  },
  props: {
    /** Input value */
    value: [Number, String],

    /** Disable input */
    disabled: Boolean,

    /** Minimum value */
    min: {
      type: Number,
      default: -Infinity
    },

    /** Maximum value */
    max: {
      type: Number,
      default: Infinity
    },

    /** Incremental step */
    step: {
      type: Number,
      default: 1
    },

    /** Title */
    title: String,

    /** Error */
    error: String,

    /** Prepend */
    prepend: String,

    /** Append */
    append: String,

    /** Precision of input value */
    precision: Number
  },
  computed: {
    modifiedValue: {
      set(value) {
        this.actualValue = value
      },
      get() {
        if (isNaN(parseFloat(this.actualValue))) {
          return `${this.prepend || ''}${this.append || ''}`
        }
        return `${this.prepend || ''}${parseFloat(this.actualValue).toFixed(this.precision)}${this.append || ''}`
      }
    }
  },
  data() {
    return {
      actualValue: this.value
    }
  },
  watch: {
    value: function(value) {
      this.actualValue = value
    },
    actualValue: function(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    decrease() {
      this.actualValue = Math.min(Math.max(this.actualValue - this.step, this.min), this.max)
    },
    increase() {
      this.actualValue = Math.min(Math.max(this.actualValue + this.step, this.min), this.max)
    }
  }
}
</script>

<style scoped lang="scss">
.number-input {
  ::v-deep input {
    text-align: center;
  }

  @include when(disabled) {
    span {
      color: $input-color--disabled;
    }
  }

  span {
    position: absolute;
    top: 0;
    bottom: 0;

    padding: $input-padding;
    background: $input-background-color--disabled;

    user-select: none;

    display: flex;
    align-items: center;
    justify-content: center;

    &:nth-of-type(1) {
      border-radius: $border-radius 0 0 $border-radius;
      border-right: 1px solid $border-color;
      left: 0;
    }

    &:nth-of-type(2) {
      border-radius: 0 $border-radius $border-radius 0;
      border-left: 1px solid $border-color;
      right: 0;
    }
  }
}
</style>
