<template>
  <li class="notification" :class="notificationType">
    <div class="notification__inner">
      <!-- row -->
      <div class="notification__row-header">
        <div class="notification__icon">
          <icon-element v-if="notification.icon" :icon="notification.icon" />
        </div>

        <span class="notification__title">
          {{ notification.title }}
        </span>

        <div class="notification__close" role="button" @click="close(notification)">
          <icon-element icon="close-bold" />
        </div>
      </div>

      <!-- row -->
      <div class="notification__row-message">
        <span></span>
        <p class="notification__message" v-html="notification.message"></p>
        <span></span>
      </div>

      <!-- row -->
      <div class="notification__row-actions" v-if="notification.primaryAction || notification.secondaryAction">
        <span></span>
        <div class="notification__actions" :style="actionButtonWrapperStyle">
          <button-element
            v-if="notification.primaryAction"
            :type="notification.primaryAction.type"
            @click="handlePrimaryActionClick"
          >
            {{ notification.primaryAction.title }}
          </button-element>
          <button-element
            v-if="notification.secondaryAction"
            :type="notification.secondaryAction.type"
            secondary
            @click="handleSecondaryActionClick"
          >
            {{ notification.secondaryAction.title }}
          </button-element>
        </div>
        <span></span>
      </div>
    </div>
  </li>
</template>

<script>
import iconElement from '../icon'
import buttonElement from '../button'
export default {
  components: {
    iconElement,
    buttonElement
  },
  props: {
    notification: Object
  },
  computed: {
    notificationType() {
      switch (this.notification.type) {
        case 'success':
          return 'notification--success'
        case 'warning':
          return 'notification--warning'
        case 'error':
          return 'notification--error'
        default:
          return 'notification--default'
      }
    },
    actionButtonWrapperStyle() {
      return {
        'grid-template-columns':
          this.notification.primaryAction && this.notification.secondaryAction ? '1fr 1fr' : '1fr'
      }
    }
  },
  methods: {
    handlePrimaryActionClick() {
      this.close(this.notification)
      this.notification.primaryAction.click()
    },
    handleSecondaryActionClick() {
      this.close(this.notification)
      this.notification.secondaryAction.click()
    },

    close() {
      this.$emit('close', this.notification)
    }
  }
}
</script>

<style scoped lang="scss">
.notification {
  position: relative;

  display: flex;
  flex-direction: column;

  margin-bottom: 1.5em;

  border-radius: $border-radius-lg;
  box-shadow: $box-shadow;
  background: $primary-light;
  color: $primary-text;

  width: 100%;

  transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.15);

  &__inner {
    padding: 1em;
  }

  &__row-header,
  &__row-message,
  &__row-actions {
    display: grid;
    align-items: center;
    grid-template-columns: 0.1fr 0.85fr 0.05fr;
  }

  &__row-message {
    margin-top: 0.3em;
  }

  &__row-actions {
    margin-top: 0.9em;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.5em;
    height: 1.5em;

    background: $info-background;
    border-radius: 50%;

    svg {
      fill: $info;

      width: 50% !important;
      height: 50% !important;
    }
  }

  &__title {
    display: block;
    font-weight: 500;
  }

  &__message {
    font-size: $font-sm;
    color: $secondary-text;

    font-weight: 300;
    line-height: 1.4;
  }

  &__close {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    cursor: pointer;

    svg {
      width: 0.7em !important;
      height: 0.6em !important;
      fill: $secondary-text;
    }
  }

  &__actions {
    display: grid;
    grid-gap: 0.5em;

    button {
      font-size: 90%;
    }
  }

  &--success {
    .notification {
      &__icon {
        background: $success-background;

        svg {
          fill: $success;
        }
      }
    }
  }

  &--warning {
    .notification {
      &__icon {
        background: $warning-background;

        svg {
          fill: $warning;
        }
      }
    }
  }

  &--error {
    .notification {
      &__icon {
        background: $error-background;

        svg {
          fill: $error;
        }
      }
    }
  }
}
</style>
