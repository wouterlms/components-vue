<template>
  <ul class="notifications">
    <transition-group name="transition" tag="div">
      <li
        v-for="notification of notifications"
        :key="notification.date"
        class="notification"
        :class="[
          notificationType(notification),
          { 'notification--clickable': notification.click }
        ]"
      >
        <div class="notification__wrapper" @click="onClick(notification)">
          <!-- icon -->
          <iconEl
            class="notification__icon"
            v-if="notification.icon"
            :icon="notification.icon"
          />

          <!-- content -->
          <div class="notification__content">
            <!-- title -->
            <span v-if="notification.title" class="notification__title">
              {{ notification.title }}
            </span>

            <!-- message -->
            <p v-if="notification.message" class="notification__message">
              {{ notification.message }}
            </p>
          </div>

          <!-- close -->
          <iconEl
            class="notification__close"
            icon="close"
            width=".5rem"
            height=".5rem"
            @click.native.stop="close(notification)"
          />
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import iconEl from './icon'

/**
 * [string]   title
 * [string]   message (required)
 * [string]   icon
 * [string]   type - success | warning | error
 * [number]   date (required)
 * [number]   duration
 * [boolean]  dontClose
 * [function] click
 */

export default {
  components: {
    iconEl
  },
  props: {
    notifications: {
      // will be fetched from the store in an actual project
      type: Array
    }
  },
  data() {
    return {
      prevLength: 0
    }
  },
  watch: {
    notifications: {
      immediate: true,
      handler(newValue) {
        if (newValue.length > this.prevLength) {
          const notification = [...newValue].pop()

          if (!notification.dontClose) {
            setTimeout(() => {
              this.notifications.splice(0, 1)
            }, notification.duration || 5000)
          }
        }
        this.prevLength = newValue.length
      }
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
    onClick(notification) {
      if (notification.click) {
        notification.click()
      }
    },
    close(notification) {
      this.notifications.splice(this.notifications.indexOf(notification), 1)
    }
  }
}
</script>

<style scoped lang="scss">
.notifications {
  position: fixed;
  top: 0;
  right: 0;
  top: 2rem;
  right: 2rem;

  width: 400px;

  z-index: 99;
}

.notification {
  position: relative;
  margin-bottom: 1.5rem;

  border-radius: $border-radius-lg;
  box-shadow: $box-shadow;

  transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.15);

  &--clickable {
    cursor: pointer;
  }

  &--default {
    background: $info-background;
    color: $info;
  }

  &--success {
    color: $success;
    fill: $success;
    background: $success-background;
  }

  &--warning {
    color: $warning;
    fill: $warning;
    background: $warning-background;
  }

  &--error {
    color: $error;
    fill: $error;
    background: $error-background;
  }

  &__wrapper {
    display: flex;
    padding: 0.8rem;
  }

  &__content {
    width: 100%;
    margin-left: 0.8rem;
  }

  &__title,
  &__message {
    display: block;
    text-align: left;
  }

  &__title {
    font-size: 1.1rem;
    font-weight: bold;

    margin-bottom: 0.5rem;
  }

  &__message {
    line-height: 1.3;
  }

  &__close {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;

    width: 0.6rem;
    height: 0.6rem;

    padding: 0.2rem;

    fill: transparentize($primary-dark, 0.8);
    cursor: pointer;
  }
}

.transition {
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    opacity: 0;
    transform: translateY(50%);
  }

  &-enter-active {
    transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &-leave-active {
    position: absolute;
    transform: translateY(-100%) scale(1.05);
    width: 100%;
  }
}
</style>
