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
    rounded: Boolean
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
.button {
  position: relative;

  padding: $button-padding;
  border-radius: $border-radius;
  border: 1px solid $primary-accent;

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
    padding: $button-padding--round;
    border-radius: 50%;
  }

  &--rounded {
    border-radius: $border-radius-lg * 2;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-weight: 500;
      white-space: nowrap;
    }

    &__icon,
    &__suffix-icon {
      fill: $button-color;
    }

    &__icon {
      margin-right: $button-padding;
    }

    &__suffix-icon {
      margin-left: $button-padding;
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
