<template>
  <div
    class="page-loader"
    :style="style"
    :class="{
      'state-finished': progress === 100
    }"
  ></div>
</template>

<script>
export default {
  props: {
    url: String,
    finished: Boolean
  },
  data() {
    return {
      transitionSpeed: 1000,
      progress: 0,
      interval: null
    }
  },
  computed: {
    style() {
      return {
        '--transition': `${this.transitionSpeed}ms`,
        '--width': `${this.progress}%`
      }
    }
  },
  watch: {
    url: {
      immediate: true,
      handler(url) {
        if (url) {
          this.fetch(url)
        }
      }
    },
    finished: function(isFinished) {
      isFinished ? this.finishLoading() : this.increaseProgress()
    }
  },
  created() {
    if (!this.url) {
      this.increaseProgress()
    }
  },
  methods: {
    increaseProgress() {
      this.progress = 0

      this.interval = setInterval(() => {
        this.progress = this.progress < 40 ? (this.progress += 1) : (this.progress += 0.2)
      }, 50)
    },
    finishLoading() {
      clearInterval(this.interval)
      this.progress = 100

      setTimeout(() => {
        setTimeout(() => {
          this.$emit('finished')
        }, 200)
      }, this.transitionSpeed)
    },
    async fetch(url) {
      this.increaseProgress()

      // await new Promise(res => setTimeout(() => res(), 2000))

      fetch(url)
        .then(res => this.$emit('response', res))
        .catch(err => this.$emit('error', err))
        .finally(() => {
          this.finishLoading()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.page-loader {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 4px;

  transition: 1s 0.5s;

  @include when(finished) {
    opacity: 0;
  }

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: var(--width);
    height: 100%;

    background: $primary-accent;
    transition: var(--transition) cubic-bezier(0.25, 0.19, 0.01, 0.98);
  }
}
</style>
