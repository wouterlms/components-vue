<template>
  <div class="app">
    <div>
      <switchEl active-text="active" inactive-text="inactive" v-model="switchh" />
    </div>
    <div>
      <checkboxEl disabled>checkbox</checkboxEl>
    </div>
    <div>
      <radioEl v-model="radio" label="A" disabled>radio A</radioEl>
      <radioEl v-model="radio" label="B">radio B</radioEl>
    </div>

    <div>
      <buttonEl type="danger" size="small" secondary rounded>Cancel</buttonEl>
      <buttonEl size="small" rounded>Confirm</buttonEl>
    </div>
  </div>
</template>

<script>
import inputEl from '@/components/input'
import loaderEl from '@/components/loader'
import selectEl from '@/components/select'
import tagInputEl from '@/components/tagInput'
import checkboxEl from '@/components/checkbox'
import radioEl from '@/components/radio'
import modalEl from '@/components/modal'
import buttonEl from '@/components/button'
import dialogEl from '@/components/dialog'
import numberInputEl from '@/components/numberInput'
import tooltipEl from '@/components/tooltip'
import optionEl from '@/components/option'
import iconEl from '@/components/icon'
import switchEl from '@/components/switch'

export default {
  components: {
    inputEl,
    loaderEl,
    selectEl,
    tagInputEl,
    checkboxEl,
    radioEl,
    modalEl,
    buttonEl,
    dialogEl,
    numberInputEl,
    tooltipEl,
    optionEl,
    iconEl,
    switchEl
  },
  data() {
    return {
      testString: 'test',
      options: [
        {
          icon: 'add',
          name: 'Option A'
        },
        {
          icon: 'remove',
          name: 'Option B'
        }
      ],
      tags: ['tag A', 'tag B'],
      option: null,
      checked: [],
      radio: 'A',
      showModal: false,
      number: 0,
      switchh: false
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
  background: rgb(245, 250, 255);
  padding: 10rem;
}

html,
body,
.app {
  font-family: 'Poppins', sans-serif;
  // display: flex;

  & > div {
    margin-bottom: 0.5rem;
  }
}
</style>
