<template>
  <div class="app">
    <notifications-element />
    <router-view></router-view>
  </div>
</template>

<script>
import notificationsElement from '@/components/notifications'
import fakeLoaderElement from '@/components/fakeLoader'

export default {
  components: {
    notificationsElement,
    fakeLoaderElement
  },
  data() {
    return {
      testString: 'test',
      options: [
        {
          icon: 'add',
          name: 'I would like to stay here'
        },
        {
          icon: 'remove',
          name: 'I would like to go there!'
        }
      ],
      tags: ['tag A', 'tag B'],
      option: null,
      checked: [],
      radio: 'A',
      showModal: false,
      number: 0,
      switchh: false,
      isLoading: true,
      show: false,
      finished: false
    }
  },
  async mounted() {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    // this.finished = true
    // this.$notification({
    //   title: 'Update available',
    //   message: 'A new <b style="font-weight: 500;">sortware version</b> is available for download.',
    //   icon: 'test/refresh',
    //   duration: 0,
    //   primaryAction: {
    //     title: 'Update',
    //     click: () => {}
    //   },
    //   secondaryAction: {
    //     title: 'Not now',
    //     click: () => {}
    //   }
    // })
    // await new Promise(resolve => setTimeout(resolve, 500))
    // this.$notification({
    //   title: 'Upload successful',
    //   message: '<b style="font-weight: 500">yeet.pdf</b> was uploaded successfully.',
    //   type: 'success'
    // })
    // await new Promise(resolve => setTimeout(resolve, 500))
    // this.$notification({
    //   title: 'Privacy warning',
    //   message: 'Someone is trying to login to your account.',
    //   icon: 'test/padlock',
    //   duration: 0,
    //   type: 'error',
    //   secondaryAction: {
    //     title: 'Check Activity',
    //     type: 'danger',
    //     click: () => {}
    //   }
    // })
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

html,
body,
.app {
  font-family: 'Poppins', sans-serif;
  background: rgb(245, 250, 255);
  padding: 4rem;
  height: 100vh;
  width: 100%;

  box-sizing: border-box;
}
</style>
