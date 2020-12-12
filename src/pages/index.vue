<template>
  <div>
    <button-element to="/examples">View Examples</button-element>
  </div>
</template>

<script>
import inputElement from '@/components/input'
import selectElement from '@/components/select'
import buttonElement from '@/components/button'

export default {
  components: {
    inputElement,
    selectElement,
    buttonElement
  },
  data() {
    return {
      options: [
        {
          name: 'test'
        },
        {
          name: 'test2'
        }
      ],
      option: null
    }
  }
}
</script>

<style scoped></style>
