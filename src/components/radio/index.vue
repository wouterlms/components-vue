<template>
  <input-wrapper-element
    class="radio"
    :class="{
      'state-checked': isChecked,
      'state-disabled': disabled,
      'state-error': error
    }"
    :error="error"
    :disabled="disabled"
  >
    <label class="radio__content">
      <span class="radio__content__input">
        <!-- custom radio -->
        <span></span>

        <input type="radio" :checked="isChecked" @input="onInput" :disabled="disabled" />
      </span>
      <span class="radio__content__label">
        <slot />
      </span>
    </label>
  </input-wrapper-element>
</template>

<script>
import inputWrapperElement from '../inputWrapper'

export default {
  components: {
    inputWrapperElement
  },
  props: {
    /** Input value */
    value: [String, Boolean],

    /** Value of radio */
    label: String,

    /** Disable radio */
    disabled: Boolean,

    /** Error */
    error: String
  },
  computed: {
    isChecked() {
      return this.value === this.label
    }
  },
  methods: {
    onInput(e) {
      if (this.disabled) {
        return
      }
      this.$emit('input', this.label)
    }
  }
}
</script>

<style scoped lang="scss">
$radio-border-color--hover: $primary-accent;
$radio-background-color--selected: $primary-accent;
$radio-background-color--disabled: #edf2fc;
$transition: cubic-bezier(0.71, -0.46, 0.29, 1.46);

.radio {
  @include when(checked) {
    .radio {
      &__content {
        &__input {
          span {
            background: $radio-background-color--selected;
            border-color: $radio-border-color--hover;

            &::before {
              transform: translate(-50%, -50%) scale(1);
            }
          }
        }
      }
    }
  }

  @include when(error) {
    .radio {
      &__content {
        &__input {
          span {
            border-color: $error;
            background: $input-background-color;

            &::before {
              background: $error;
            }
          }
        }

        &__label {
          color: $error;
        }
      }
    }
  }

  @include when(disabled) {
    .radio {
      &__content {
        cursor: not-allowed;

        &__input {
          span {
            background: $radio-background-color--disabled;
            border-color: $radio-background-color--disabled;
          }
        }

        &__label {
          color: $input-color--disabled;
        }
      }
    }
  }

  &:hover:not(.state-disabled):not(.state-error) &__content__input {
    span {
      border-color: $radio-border-color--hover;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    user-select: none;

    cursor: pointer;

    &__input {
      line-height: 0;

      span {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid $border-color;
        border-radius: 50%;

        background: $input-background-color;

        width: 0.875em;
        height: 0.875em;

        padding: 0.125em;
        box-sizing: border-box;

        // z-index: 1;
        transition: 0.2s $transition;

        &::before {
          content: '';

          position: absolute;
          top: 50%;
          left: 50%;

          background: $primary-light;
          border-radius: 50%;

          width: 0.313em;
          height: 0.313em;

          transition: 0.3s $transition;
          transform: translate(-50%, -50%) scale(0);
          transform-origin: center;
        }
      }
      input {
        display: none;
      }
    }

    &__label {
      margin-left: 0.4em;
    }
  }
}
</style>
