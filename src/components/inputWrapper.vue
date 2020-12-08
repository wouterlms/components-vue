<template>
  <div
    class="el-input__wrapper"
    :class="{
      'state--disabled': disabled,
      'state--error': error
    }"
  >
    <div class="el-input__wrapper__content" v-if="title || error">
      <span v-if="title" class="el-input__wrapper__content__title">
        {{ title }}
      </span>

      <div
        v-if="title && error"
        class="el-input__wrapper__content__divider"
      ></div>

      <span v-if="error" class="el-input__wrapper__content__error">
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
    title: String,
    error: String,
    disabled: Boolean
  }
}
</script>

<style scoped lang="scss">
.el-input__wrapper {
  width: 100%;

  @include when(disabled) {
    .el-input__wrapper__content {
      cursor: not-allowed;
      color: $secondary-text;
    }
  }

  @include when(error) {
    .el-input__wrapper__content {
      color: $error;
    }
  }

  &__content {
    position: relative;

    display: flex;
    align-items: center;

    font-size: 0.8rem;
    text-align: left;
    color: $input-color;

    margin-bottom: 0.2rem;

    &__title,
    &__error {
      transition: $input-transition;
    }

    &__divider {
      width: 1px;
      height: 10px;

      margin: 0 0.4rem;

      background: $error;
    }
  }
}
</style>
