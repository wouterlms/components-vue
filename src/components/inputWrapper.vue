<template>
  <div
    class="input__wrapper"
    :class="{
      'state--disabled': disabled,
      'state--error': error
    }"
  >
    <div class="input__wrapper__content" v-if="title || error">
      <span v-if="title" class="input__wrapper__content__title">
        {{ title }}
      </span>

      <div v-if="title && error" class="input__wrapper__content__divider"></div>

      <span v-if="error" class="input__wrapper__content__error">
        {{ error }}
      </span>
    </div>

    <!-- slot -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    /** Title */
    title: String,

    /** Error */
    error: String,

    /** Disabled */
    disabled: Boolean
  }
}
</script>

<style scoped lang="scss">
.input__wrapper {
  width: 100%;

  @include when(disabled) {
    .input__wrapper__content {
      cursor: not-allowed;
      color: $input-color--disabled;
    }
  }

  @include when(error) {
    .input__wrapper__content {
      color: $error;
    }
  }

  &__content {
    position: relative;

    display: flex;
    align-items: center;

    font-size: 0.85em;
    text-align: left;
    color: $input-color;

    margin-bottom: 0.4em;

    &__title,
    &__error {
      // transition: $input-transition;
    }

    &__divider {
      width: 1px;
      height: 0.8em;

      margin: 0 0.4em;

      background: $error;
    }
  }
}
</style>
