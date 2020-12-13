<template>
  <label
    class="slider"
    :class="{
      'state-switched': isSwitched,
      'state-error': error,
      'state-disabled': disabled
    }"
  >
    <span v-if="inactiveText" class="slider__inactive">
      {{ inactiveText }}
    </span>

    <span class="slider__input">
      <input type="checkbox" v-model="isSwitched" :disabled="disabled" />
    </span>

    <div class="slider__slider"></div>

    <span v-if="activeText" class="slider__active">
      {{ activeText }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    /** Input value */
    value: Boolean,

    /** Disable switch */
    disabled: Boolean,

    /** Text used on inactive side */
    inactiveText: String,

    /** Text used on active side */
    activeText: String,

    /** Error */
    error: String
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
$switch-background-color--inactive: #dddfe6;
$switch-background-color--active: $primary-accent;
$switch-background-color--disabled: #edf2fc;
$switch-width: 2.5em;
$transition: 0.3s;

.slider {
  display: flex;
  align-items: center;
  user-select: none;

  cursor: pointer;

  @include when(switched) {
    .slider {
      &__slider {
        background: $switch-background-color--active;

        &::before {
          transform: translateX($switch-width / 2);
        }
      }
    }
  }

  @include when(error) {
    .slider {
      &__active,
      &__inactive {
        color: $error;
      }
    }
  }

  @include when(disabled) {
    cursor: not-allowed;

    @include when(switched) {
      .slider__slider {
        background: lighten($switch-background-color--active, 20);
      }
    }

    .slider {
      &__active,
      &__inactive {
        color: $input-color--disabled;
      }
    }
  }

  input {
    display: none;
  }

  &__active,
  &__inactive {
    font-weight: 500;
    color: $primary-text;
  }

  &__inactive {
    margin-right: 0.5em;
  }

  &__active {
    margin-left: 0.5em;
  }

  &__slider {
    position: relative;
    width: $switch-width;
    height: $switch-width / 2;

    background: $switch-background-color--inactive;
    border-radius: $border-radius-lg;

    transition: $transition;

    &::before {
      content: '';

      position: absolute;
      top: 0.063em;
      left: 0.063em;

      width: $switch-width / 2 - 0.126em;
      height: $switch-width / 2 - 0.126em;

      border-radius: 50%;

      background: $primary-light;
      transition: $transition;
    }
  }
}
</style>
