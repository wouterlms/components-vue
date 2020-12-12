<template>
  <div>
    <router-link to="/examples">examples</router-link>

    <div style="width: 350px; margin-top: 50px;">
      <button-element>button</button-element>
    </div>
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
