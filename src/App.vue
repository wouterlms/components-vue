<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  async mounted() {
    // this.notificationTest()
  },
  methods: {
    async notificationTest() {
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      this.$notification({
        title: 'Update available',
        message: 'A new <b style="font-weight: 500;">sortware version</b> is available for download.',
        icon: 'test/refresh',
        duration: 0,
        primaryAction: {
          title: 'Update',
          click: () => {}
        },
        secondaryAction: {
          title: 'Not now',
          click: () => {}
        }
      })
      // await new Promise((resolve) => setTimeout(resolve, 500))
      // this.$notification({
      //   title: 'Upload successful',
      //   message: '<b style="font-weight: 500">yeet.pdf</b> was uploaded successfully.',
      //   type: 'success'
      // })
      // await new Promise((resolve) => setTimeout(resolve, 500))
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
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&display=swap');

html,
body,
.app {
  font-family: 'Poppins', sans-serif;
  background: rgb(245, 250, 255);
  padding: 4rem;
  min-height: 100vh;
  width: 100%;

  box-sizing: border-box;
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
