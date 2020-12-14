<template>
  <div>
    <button-element to="/examples">examples</button-element>

    <time-picker-element></time-picker-element>
  </div>
</template>

<script>
import buttonElement from '@/components/button'
import timePickerElement from '@/components/timePicker'

export default {
  components: {
    buttonElement,
    timePickerElement
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
