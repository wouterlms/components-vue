<template>
  <component
    :is="componentType"
    :type="nativeType"
    :to="to"
    :href="href"
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
    :style="buttonSize"
  >
    <span class="button__content">
      <iconEl v-if="icon" :icon="icon" class="button__content__icon" />
      <span v-if="$slots.default">
        <slot />
      </span>
      <loaderEl v-if="loading" class="button__content__loader" light />
      <iconEl v-if="suffixIcon" :icon="suffixIcon" class="button__content__suffix-icon" />
    </span>
  </component>
</template>

<script>
import loaderEl from './loader'
import iconEl from './icon'

export default {
  components: {
    loaderEl,
    iconEl
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
    buttonSize() {
      switch (this.size) {
        case 'extra-small':
          return {
            '--padding-y': this.round ? '7px' : '7px',
            '--padding-x': this.round ? '7px' : '12px',
            '--font-size': '.8rem',
            '--icon-size': '.6rem'
          }
        case 'small':
          return {
            '--padding-y': this.round ? '9px' : '9px',
            '--padding-x': this.round ? '9px' : '15px',
            '--font-size': '.9rem',
            '--icon-size': '.7rem'
          }
      }
      return {
        '--padding-y': this.round ? '12px' : '12px',
        '--padding-x': this.round ? '12px' : '20px',
        '--font-size': '1rem',
        '--icon-size': '.8rem'
      }
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
// $button-padding-y: 12px;
// $button-padding-x: 20px;
// $button-padding--round: 10px;
$button-color: $primary-light;
$button-background: $primary-accent;

.button {
  position: relative;

  padding: var(--padding-y) var(--padding-x);
  border-radius: $border-radius;
  border: 1px solid $primary-accent;

  font-family: inherit;

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
    background: transparentize($button-background, 0.5);
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
    padding: var(--padding-x);
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
      font-size: var(--font-size);
      white-space: nowrap;
    }

    &__icon,
    &__suffix-icon {
      fill: $button-color;
      width: var(--icon-size) !important;
      height: var(--icon-size) !important;
    }

    &__icon ~ span {
      padding-left: calc(var(--padding-x) / 2);
    }

    span + &__suffix-icon {
      padding-left: calc(var(--padding-x) / 2);
    }

    &__loader {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      ::v-deep path {
        stroke: $primary-light !important;
      }
    }
  }
}
</style>
