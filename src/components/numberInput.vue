<template>
  <input-element
    class="number-input"
    type="text"
    v-model="computedValue"
    :disabled="disabled"
    :title="title"
    :error="error"
    :class="{ 'state-disabled': disabled }"
  >
    <template slot="prepend">
      <span role="button" @click.prevent="decrease">
        -
      </span>
    </template>
    <template slot="append">
      <span role="button" @click.prevent="increase">
        +
      </span>
    </template>
  </input-element>
</template>

<script>
import inputElement from './input'

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
    computedValue: {
      get() {
        return `${this.prepend || ''}${this.actualValue}${this.append || ''}`
      },

      set(value) {
        this.actualValue = this.precision ? parseFloat(value).toFixed(this.precision) : parseFloat(value)
      }
    },
    computedValueAsNumber() {
      return parseFloat(this.computedValue.replace(/\D/g, ''))
    }
  },
  data() {
    return {
      actualValue: this.value
    }
  },
  watch: {
    actualValue: function(v) {
      this.$emit('input', this.computedValueAsNumber)
    }
  },
  methods: {
    decrease() {
      if (this.disabled) {
        return
      }
      if (this.computedValueAsNumber - this.step > this.min) {
        if (this.computedValueAsNumber > this.max) {
          this.computedValue = this.max
        } else {
          this.computedValue = this.computedValueAsNumber - this.step
        }
      } else {
        this.computedValue = this.min
      }
    },
    increase() {
      if (this.disabled) {
        return
      }
      if (this.computedValueAsNumber + this.step < this.max) {
        if (this.computedValueAsNumber < this.min) {
          this.computedValue = this.min
        } else {
          this.computedValue = this.computedValueAsNumber + this.step
        }
      } else {
        this.computedValue = this.max
      }
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
