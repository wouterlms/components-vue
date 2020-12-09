<template>
  <inputWrapperEl
    class="checkbox"
    :error="error"
    :disabled="disabled"
    :class="{
      'state-checked': isChecked,
      'state-disabled': disabled,
      'state-error': error
    }"
  >
    <label class="checkbox__content">
      <span class="checkbox__content__input">
        <span>
          <iconEl icon="check" />
        </span>

        <input type="checkbox" :checked="isChecked" v-model="isChecked" />
      </span>
      <span class="checkbox__content__label">
        <slot />
      </span>
    </label>
  </inputWrapperEl>
</template>

<script>
import inputWrapperEl from './inputWrapper'
import iconEl from './icon'

export default {
  components: {
    inputWrapperEl,
    iconEl
  },
  props: {
    value: [Array, Boolean],
    label: String,
    disabled: Boolean,
    error: String
  },
  computed: {
    isChecked: {
      set: function(isChecked) {
        if (this.disabled) {
          return
        }
        if (this.value instanceof Array) {
          const newValue = [...this.value]

          if (isChecked) {
            newValue.push(this.label)
          } else {
            newValue.splice(newValue.indexOf(this.label), 1)
          }

          this.$emit('input', newValue)
        } else {
          this.$emit('input', isChecked)
        }
      },
      get: function(value) {
        if (this.value instanceof Array) {
          return this.value.includes(this.label)
        }
        return this.value === true
      }
    }
  }
}
</script>

<style scoped lang="scss">
$transition: cubic-bezier(0.71, -0.46, 0.29, 1.46);

.checkbox {
  @include when(disabled) {
    .checkbox {
      cursor: not-allowed;

      &__content {
        &__input {
          span {
            background: $checkbox-background-color--disabled;
          }
          &__label {
            color: $input-color--disabled;
          }
        }
      }
    }
  }

  @include when(checked) {
    .checkbox {
      &__content {
        &__input {
          span {
            background: $checkbox-background-color--selected;
            border-color: $checkbox-border-color--hover;

            svg {
              transform: scale(1);
            }
          }
        }
      }
    }
  }

  @include when(error) {
    .checkbox {
      &__content {
        &__input {
          span {
            border-color: $error;
            background: $input-background-color;

            svg {
              fill: $error;
            }
          }
        }

        &__label {
          color: $error;
        }
      }
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
        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid $border-color;
        border-radius: $border-radius-sm;

        background: $input-background-color;

        width: 14px;
        height: 14px;

        padding: 2px;
        box-sizing: border-box;

        z-index: 1;
        transition: 0.2s $transition;

        svg {
          fill: $primary-light;
          transform: scale(0);
          transition: 0.3s $transition;
        }
      }
      input {
        display: none;
      }
    }

    &__label {
      margin-left: 0.4rem;
      font-weight: 500;
    }
  }

  &:hover:not(.checkbox--disabled):not(.checkbox--error) &__content__input {
    span {
      border-color: $checkbox-border-color--hover;
    }
  }
}
</style>
