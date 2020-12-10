<template>
  <inputWrapper
    class="input"
    :class="{
      'state-disabled': disabled,
      'state-loading': loading,
      'state-error': error,
      'state-focused': isFocused,
      'state-read-only': readonly
    }"
    :title="title"
    :error="error"
    :disabled="disabled"
  >
    <label class="input__content" :style="borderStyle">
      <!-- prepend -->
      <slot name="prepend" />

      <!-- icon -->
      <div v-if="icon" class="input__content__icon">
        <iconEl :icon="icon" />
      </div>

      <component
        class="input__content__input"
        ref="input"
        :is="componentType"
        :type="inputType"
        :value="value"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :disabled="disabled || loading"
        :readonly="readonly"
        :minlength="minlength"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :resize="resize"
        :style="inputStyle"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="e => $emit('keydown', e)"
      />

      <!-- suffix icon -->
      <div v-if="getSuffixIcon" class="input__content__suffix-icon" @click="handleSuffixIconClick">
        <iconEl :icon="getSuffixIcon" />
      </div>

      <!-- append -->
      <slot name="append" />

      <!-- loader -->
      <div v-if="loading" class="input__content__loader">
        <loaderEl radius="1.5rem" />
      </div>
    </label>
  </inputWrapper>
</template>

<script>
import inputWrapper from './inputWrapper'
import iconEl from './icon'
import loaderEl from './loader'

export default {
  components: {
    inputWrapper,
    iconEl,
    loaderEl
  },
  props: {
    // default
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    spellcheck: Boolean,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    minlength: Number,
    maxlength: Number,
    min: Number,
    max: Number,

    // custom
    title: String,
    icon: String,
    suffixIcon: String,
    error: String,
    loading: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    componentType() {
      return this.type === 'textarea' ? 'textarea' : 'input'
    },
    inputType() {
      if (this.type === 'password') {
        return this.showPassword ? 'text' : 'password'
      }
      return this.type
    },
    inputStyle() {
      return {
        resize: this.resize,
        height: this.height
      }
    },
    borderStyle() {
      return {
        'border-width': this.border ? '1px' : '0'
      }
    },
    getSuffixIcon() {
      return this.type === 'password' ? (this.showPassword ? 'eye-hide' : 'eye-view') : this.suffixIcon
    }
  },
  data() {
    return {
      isFocused: false,
      showPassword: false
    }
  },

  watch: {
    value: function(newValue) {
      this.$refs.input.value = newValue
    }
  },

  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
    onFocus() {
      this.isFocused = true
    },
    onBlur() {
      this.isFocused = false
    },
    handleSuffixIconClick() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;

  @include when(focused) {
    .input__content {
      border: 1px solid $border-color--focus;
    }
  }

  @include when(read-only) {
    .input__content {
      cursor: pointer;
    }
  }

  @include when(error) {
    .input__content {
      border: 1px solid $error;

      &__icon,
      &__suffix-icon {
        fill: $error;
      }
    }
  }

  @include when(disabled) {
    .input__content {
      background: $input-background-color--disabled;
      cursor: not-allowed;

      &__input {
        color: $input-color--disabled;
      }
    }
  }

  @include when(loading) {
    .input__content {
      cursor: not-allowed;
    }
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;

    border: 1px solid $border-color;
    border-radius: $border-radius;
    background: $input-background-color;

    transition: $input-transition;
    margin: 0;
    line-height: 1.2;

    cursor: pointer;

    &__icon,
    &__suffix-icon {
      fill: $input-placeholder-color;
      transition: $input-transition;
      line-height: 0;

      svg {
        width: 1rem;
      }
    }

    &__icon {
      padding-left: $input-padding;
    }

    &__suffix-icon {
      padding-right: $input-padding;
    }

    &__input {
      border: none;
      background: transparent;
      padding: $input-padding;
      color: $input-color;
      resize: none;

      font-family: inherit;
      font-size: inherit;

      width: 100%;
      cursor: inherit !important;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type='number'] {
        -moz-appearance: textfield;
      }

      @include placeholder {
        color: $input-placeholder-color;
      }
    }

    &__loader {
      height: 100%;
      width: 2.5rem;

      background: $input-background-color;
      border-radius: $border-radius;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
