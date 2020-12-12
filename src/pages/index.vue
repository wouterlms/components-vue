<template>
  <div>
    <button-element to="/examples">examples</button-element>
    <div style="padding: 10rem; padding-left: 20rem;">
      {{ color }}
      <color-picker v-model="color"></color-picker>
    </div>
  </div>
</template>

<script>
import buttonElement from '@/components/button'
import colorPicker from '@/components/colorPicker'

import variables from '@/assets/scss/_variables.scss'

export default {
  components: {
    buttonElement,
    colorPicker
  },
  data() {
    return {
      color: variables.primaryAccent
    }
  }
}
</script>

<style scoped></style>
