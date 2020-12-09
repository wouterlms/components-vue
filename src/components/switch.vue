<template>
  <label
    class="slider"
    :class="{
      'state-switched': isSwitched,
      'state-disabled': disabled
    }"
  >
    <span>
      {{ inactiveText }}
    </span>

    <span class="slider__input">
      <input type="checkbox" v-model="isSwitched" :disabled="disabled" />
    </span>

    <div class="slider__slider"></div>

    <span>
      {{ activeText }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: Boolean,
    disabled: Boolean,
    activeText: String,
    inactiveText: String
  },
  computed: {
    isSwitched: {
      set: function(isSwitched) {
        if (this.disabled) {
          return
        }
        this.$emit('input', isSwitched)
      },
      get: function(value) {
        return this.value === true
      }
    }
  }
}
</script>

<style scoped lang="scss">
$transition: 0.3s;

.slider {
  display: flex;
  align-items: center;
  user-select: none;

  cursor: pointer;

  @include when(switched) {
    .slider {
      &__slider {
        background: $slider-background-color--active;

        &::before {
          transform: translateX(20px);
        }
      }
    }
  }

  @include when(disabled) {
    cursor: not-allowed;
  }

  input {
    display: none;
  }

  &__slider {
    position: relative;
    width: 40px;
    height: 20px;

    background: $slider-background-color--inactive;
    border-radius: $border-radius-lg;

    transition: $transition;

    &::before {
      content: '';

      position: absolute;
      top: 1px;
      left: 1px;

      width: 18px;
      height: 18px;

      border-radius: 50%;

      background: $primary-light;
      transition: $transition;
    }
  }
}
</style>
