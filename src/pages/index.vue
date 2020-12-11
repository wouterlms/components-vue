<template>
  <div>
    <router-link to="/examples">examples</router-link>

    <div style="width: 350px; margin-top: 50px;">
      <input-element title="Your name" disabled> </input-element>

      <select-element :options="options" label="name" v-model="option"> </select-element>
    </div>
  </div>
</template>

<script>
import inputElement from '@/components/input'
import selectElement from '@/components/select'

export default {
  components: {
    inputElement,
    selectElement
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
