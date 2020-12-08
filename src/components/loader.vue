<template>
  <div class="el-loader" :style="style">
    <svg class="el-loader__circular" viewBox="25 25 50 50">
      <circle
        class="el-loader__circular__path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: String,
      default: '20px'
    }
  },
  computed: {
    style() {
      return {
        '--radius': this.radius
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-loader {
  position: relative;
  margin: 0 auto;
  width: var(--radius) !important;
  height: var(--radius) !important;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  &__circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    &__path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
      stroke-linecap: round;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color {
  100%,
  0% {
    stroke: $primary-accent;
  }
  40% {
    stroke: $primary-dark;
  }
  66% {
    stroke: $primary-accent;
  }
  80%,
  90% {
    stroke: $primary-dark;
  }
}
</style>
