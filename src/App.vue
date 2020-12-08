<template>
  <div class="app">
    <tagInputEl icon="tag" suffix-icon="tag" :tags="tags" style="width: 500px;" placeholder="test" />
  </div>
</template>

<script>
import inputEl from '@/components/input'
import loaderEl from '@/components/loader'
import selectEl from '@/components/select'
import tagInputEl from '@/components/tagInput'
import checkboxEl from '@/components/checkbox'
import radioEl from '@/components/radio'

export default {
  components: {
    inputEl,
    loaderEl,
    selectEl,
    tagInputEl,
    checkboxEl,
    radioEl
  },
  data() {
    return {
      testString: 'test',
      options: [
        {
          name: 'Option A'
        },
        {
          name: 'Option B'
        }
      ],
      tags: ['tag A', 'tag B'],
      option: null,
      checked: [],
      radio: 'A'
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

body {
  background: rgb(245, 250, 255);
  padding: 10rem;
}

html,
body,
.app {
  font-family: 'Montserrat', sans-serif;
}
</style>
