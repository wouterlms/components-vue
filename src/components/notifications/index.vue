<template>
  <ul class="notifications">
    <transition-group name="transition" tag="div">
      <notification-element
        v-for="notification of notifications"
        :key="notification.date"
        :notification="notification"
        @close="close"
      />
    </transition-group>
  </ul>
</template>

<script>
import Vue from 'vue'
import notificationElement from './notification'

export default {
  components: {
    notificationElement
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
    Vue.prototype.$notification = (notification) => {
      this.addNotification(notification)
    }
  },
  methods: {
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
