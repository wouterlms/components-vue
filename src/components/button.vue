<template>
  <component
    :is="componentType"
    :type="nativeType"
    :to="to"
    :href="href"
    :disabled="disabled || loading"
    @click="handleClick"
    class="button"
    :class="[
      buttonType,
      {
        'state-disabled': disabled,
        'state-loading': loading,
        'button--round': round,
        'button--rounded': rounded
      }
    ]"
  >
    <span class="button__content">
      <icon-element v-if="icon" :icon="icon" class="button__content__icon" />
      <span v-if="$slots.default">
        <slot />
      </span>
      <loader-element v-if="loading" class="button__content__loader" :color="loaderColor" />
      <icon-element v-if="suffixIcon" :icon="suffixIcon" class="button__content__suffix-icon" />
    </span>
  </component>
</template>

<script>
import loaderElement from './loader'
import iconElement from './icon'
import variables from '@/assets/scss/_variables.scss'

export default {
  components: {
    loaderElement,
    iconElement
  },
  props: {
    nativeType: {
      type: String,
      default: 'button'
    },
    type: String,
    disabled: Boolean,
    to: String,
    href: String,
    loading: Boolean,
    icon: String,
    suffixIcon: String,
    secondary: Boolean,
    round: Boolean,
    rounded: Boolean,
    size: String
  },
  computed: {
    componentType() {
      if (this.to) {
        return 'router-link'
      } else if (this.href) {
        return 'a'
      }
      return 'button'
    },
    buttonType() {
      switch (this.type) {
        case 'success':
          return `button--${this.secondary ? 'secondary' : 'primary'}--success`
        case 'warning':
          return `button--${this.secondary ? 'secondary' : 'primary'}--warning`
        case 'danger':
          return `button--${this.secondary ? 'secondary' : 'primary'}--danger`
      }
      return `button--${this.secondary ? 'secondary' : 'primary'}`
    },
    loaderColor() {
      if (this.secondary) {
        switch (this.type) {
          case 'success':
            return variables.success
          case 'warning':
            return variables.warning
          case 'danger':
            return variables.error
          default:
            return variables.primaryAccent
        }
      }
      return variables.primaryLight
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled && !this.loading) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped lang="scss">
$button-color: $primary-light;
$button-background: $primary-accent;

$padding-y: 0.8em;
$padding-x: 1.2em;

$transition: 0.3s;

.button {
  position: relative;

  padding: $padding-y $padding-x;
  border-radius: $border-radius;
  border: 1px solid $primary-accent;

  font-family: inherit;
  transition: 0.3s;

  @include when(loading) {
    cursor: not-allowed;

    .button {
      &__content {
        span,
        &__icon,
        &__suffix-icon {
          opacity: 0;
        }
      }
    }
  }

  @include when(disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--primary {
    color: $button-color;
    background: $button-background;

    &--success {
      background: $success;
      color: $primary-light;
      border-color: $success;
    }

    &--warning {
      background: $warning;
      color: $primary-light;
      border-color: $warning;
    }

    &--danger {
      background: $error;
      color: $primary-light;
      border-color: $error;
    }
  }

  &--secondary {
    color: $primary-accent;
    background: transparent;

    .button {
      &__content {
        &__icon,
        &__suffix-icon {
          fill: $primary-accent;
        }
      }
    }

    &--success {
      color: $success;
      border-color: $success;
      background: transparent;

      .button {
        &__content {
          &__icon,
          &__suffix-icon {
            fill: $success;
          }
        }
      }
    }

    &--warning {
      color: $warning;
      border-color: $warning;
      background: transparent;

      .button {
        &__content {
          &__icon,
          &__suffix-icon {
            fill: $warning;
          }
        }
      }
    }

    &--danger {
      color: $error;
      border-color: $error;
      background: transparent;

      .button {
        &__content {
          &__icon,
          &__suffix-icon {
            fill: $error;
          }
        }
      }
    }
  }

  &--round {
    padding: $padding-x;
    border-radius: 50%;
  }

  &--rounded {
    border-radius: $border-radius-lg * 2;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;

    span {
      font-weight: 500;
      font-size: 1em;
      white-space: nowrap;
    }

    &__icon,
    &__suffix-icon {
      fill: $button-color;
      width: 0.9em !important;
      height: 0.9em !important;
    }

    &__icon ~ span {
      padding-left: calc(#{$padding-x} / 2);
    }

    span + &__suffix-icon {
      padding-left: calc(#{$padding-x} / 2);
    }

    &__loader {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);
    }
  }
}
</style>
