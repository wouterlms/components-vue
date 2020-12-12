<template>
  <div>
    <notifications-element />
    <button-element to="/examples">examples</button-element>
  </div>
</template>

<script>
import notificationsElement from '@/components/notifications'
import buttonElement from '@/components/button'

export default {
  components: {
    buttonElement,
    notificationsElement
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
