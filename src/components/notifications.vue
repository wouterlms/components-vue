<template>
  <ul class="notifications">
    <transition-group name="transition" tag="div">
      <li
        v-for="notification of notifications"
        :key="notification.date"
        class="notification"
        :class="[notificationType(notification), { 'notification--clickable': notification.click }]"
      >
        <div class="notification__inner">
          <!-- row -->
          <div class="notification__row-header">
            <div class="notification__icon">
              <el-icon v-if="notification.icon" :icon="notification.icon" />
            </div>

            <span class="notification__title">
              {{ notification.title }}
            </span>

            <div class="notification__close" role="button" @click="close(notification)">
              <el-icon icon="close-bold" />
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
            <div class="notification__actions">
              <el-button
                v-if="notification.primaryAction"
                :type="notification.primaryAction.type"
                @click="handlePrimaryActionClick(notification)"
              >
                {{ notification.primaryAction.title }}
              </el-button>
              <el-button
                v-if="notification.secondaryAction"
                :type="notification.secondaryAction.type"
                secondary
                @click="handleSecondaryActionClick(notification)"
              >
                {{ notification.secondaryAction.title }}
              </el-button>
            </div>
            <span></span>
          </div>
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import Vue from 'vue'
import elIcon from './icon'
import elButton from './button'

export default {
  components: {
    elIcon,
    elButton
  },
  data() {
    return {
      prevLength: 0,
      notifications: []
    }
  },
  watch: {
    notifications: {
      immediate: true,
      handler(notifications) {
        if (notifications.length > this.prevLength) {
          const notification = [...notifications].pop()

          if (notification.timeout !== 0) {
            setTimeout(() => {
              this.close(notification)
            }, notification.timeout || 5000)
          }
        }
        this.prevLength = notifications.length
      }
    }
  },
  created() {
    Vue.prototype.$notification = notification => {
      this.addNotification(notification)
    }
  },
  methods: {
    notificationType(notification) {
      switch (notification.type) {
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
    handlePrimaryActionClick(notification) {
      this.close(notification)
      notification.primaryAction.click()
    },
    handleSecondaryActionClick(notification) {
      this.close(notification)
      notification.secondaryAction.click()
    },
    close(notification) {
      this.notifications.splice(this.notifications.indexOf(notification), 1)
    },
    addNotification(notification) {
      this.notifications.push({ ...notification, date: Date.now() })
    }
  }
}
</script>

<style scoped lang="scss">
.notifications {
  position: fixed;
  top: 0;
  right: 0;
  top: 2em;
  right: 2em;

  width: 400px;

  z-index: 99;
}

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
      height: 0.7em !important;
      fill: $secondary-text;
    }
  }

  &__actions {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(min-content, 1fr));

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

.transition {
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    opacity: 0;
    transform: translateY(25%);
  }

  &-enter-active {
    transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &-leave-active {
    position: absolute;
    transform: translateY(-50%) scale(1.05);
    width: 100%;
  }
}
</style>
