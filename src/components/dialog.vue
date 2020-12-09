<template>
  <modalEl :show="show" :requiresAction="true">
    <slot />
  </modalEl>
</template>

<script>
import modalEl from './modal'

export default {
  components: {
    modalEl
  },
  props: {
    title: String,
    show: Boolean
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
