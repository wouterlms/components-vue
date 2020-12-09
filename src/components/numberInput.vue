<template>
  <inputEl
    class="number-input"
    type="number"
    v-model="actualValue"
    :disabled="disabled"
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
  </inputEl>
</template>

<script>
import inputEl from './input'
import iconEl from './icon'

export default {
  components: {
    inputEl,
    iconEl
  },
  props: {
    value: [Number, String],
    disabled: Boolean,
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    // nog fixen
    precision: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      actualValue: this.value
    }
  },
  watch: {
    actualValue: function(newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    decrease() {
      if (this.disabled) {
        return
      }
      if (this.actualValue > this.min) {
        if (this.actualValue > this.max) {
          this.actualValue = this.max
        } else {
          this.actualValue -= this.step
        }
      }
    },
    increase() {
      if (this.disabled) {
        return
      }
      if (this.actualValue < this.max) {
        if (this.actualValue < this.min) {
          this.actualValue = this.min
        } else {
          this.actualValue += this.step
        }
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
