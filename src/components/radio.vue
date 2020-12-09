<template>
  <inputWrapperEl
    class="el-radio"
    :class="{
      'state-checked': isChecked,
      'state-disabled': disabled,
      'state-error': error
    }"
    :error="error"
    :disabled="disabled"
  >
    <label class="el-radio__content">
      <span class="el-radio__content__input">
        <!-- custom radio -->
        <span></span>

        <!-- real radio -->
        <input type="radio" :checked="isChecked" @input="onInput" :disabled="disabled" />
      </span>
      <span class="el-radio__content__label">
        <template v-if="label">
          {{ label }}
        </template>
        <slot v-else />
      </span>
    </label>
  </inputWrapperEl>
</template>

<script>
import inputWrapperEl from './inputWrapper'

export default {
  components: {
    inputWrapperEl
  },
  props: {
    value: [String, Boolean],
    label: String,
    disabled: Boolean,
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
$transition: cubic-bezier(0.71, -0.46, 0.29, 1.46);
.el-radio {
  @include when(checked) {
    .el-radio {
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
    .el-radio {
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

  @include when(disabled) {
    .el-radio {
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

  &:hover:not(.state-disabled):not(.state-disabled) &__content__input {
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

        width: 14px;
        height: 14px;

        padding: 2px;
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

          width: 5px;
          height: 5px;

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
      margin-left: 0.4rem;
      font-weight: 500;
    }
  }
}
</style>
