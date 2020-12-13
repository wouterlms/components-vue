<template>
  <input-wrapper-element
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
      <div v-if="icon" class="input__content__icon" @click.prevent>
        <icon-element :icon="icon" />
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
        @keydown="(e) => $emit('keydown', e)"
      />

      <!-- suffix icon -->
      <div v-if="getSuffixIcon" class="input__content__suffix-icon" @click.prevent="handleSuffixIconClick">
        <icon-element :icon="getSuffixIcon" />
      </div>

      <!-- append -->
      <slot name="append" />

      <!-- loader -->
      <div v-if="loading" class="input__content__loader">
        <loader-element radius="1.3em" />
      </div>
    </label>
  </input-wrapper-element>
</template>

<script>
import inputWrapperElement from '../inputWrapper'
import iconElement from '../icon'
import loaderElement from '../loader'

export default {
  components: {
    inputWrapperElement,
    iconElement,
    loaderElement
  },
  props: {
    /** Input type - 'text' | 'password' | 'number' | 'textarea' */
    type: {
      type: String,
      default: 'text'
    },

    /** Native input placeholder */
    placeholder: String,

    /** Input value */
    value: [String, Number],

    /** Native spellcheck */
    spellcheck: Boolean,

    /** Textarea resize - 'none' | 'both' | 'horizontal' | 'vertical' */
    resize: String,

    /** Disable the input */
    disabled: Boolean,

    /** Native readonly */
    readonly: Boolean,

    /** Minimum input length */
    minlength: Number,

    /** Maximum input length */
    maxlength: Number,

    /** Minimum number (type = number) */
    min: Number,

    /** Maximum number (type = number) */
    max: Number,

    /** Input icon */
    icon: String,

    /** Input suffix icon */
    suffixIcon: String,

    /** Show input loader */
    loading: Boolean,

    /** Textarea height */
    height: {
      type: String,
      default: 'auto'
    },

    /** Show border */
    border: {
      type: Boolean,
      default: true
    },

    /** Input title - passed to <input-wrapper-element> */
    title: String,

    /** Input error - also passed to <input-wrapper-element> */
    error: String
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
    onFocus(e) {
      this.$emit('focus', e)
      this.isFocused = true
    },
    onBlur(e) {
      this.$emit('blur', e)
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

        @include placeholder {
          color: $input-placeholder-color--disabled;
        }
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
        width: 0.9em !important;
        height: 0.9em !important;
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
      width: 2.5em;

      background: $input-background-color;
      border-radius: $border-radius;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
