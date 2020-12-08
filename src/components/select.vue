<template>
  <div
    class="el-select"
    :class="{
      'state-loading': loading,
      'state-disabled': disabled,
      'state-error': error,
      'state-focused': showSelectMenu
    }"
  >
    <inputEl
      cass="el-select__input"
      :icon="icon"
      :placeholder="placeholder"
      :loading="loading"
      :disabled="disabled"
      :title="title"
      :error="error"
      suffix-icon="chevron-down"
      readonly
      @mouseup.native="onInputClick"
      v-click-outside="() => (showSelectMenu = false)"
      v-model="computedValue"
    >
      <!-- prepend -->
      <template slot="prepend">
        <slot name="prepend" />
      </template>

      <!-- append -->
      <template slot="append">
        <slot name="append" />
      </template>
    </inputEl>

    <transition name="tooltip">
      <tooltipEl
        v-if="showSelectMenu"
        arrow-align="right"
        arrow-offset=".9rem"
        margin="10px"
        class="el-select__options"
      >
        <ul v-if="options && options.length">
          <li
            v-for="option of options"
            :key="option[label]"
            @click="select(option)"
          >
            {{ option[label] }}
          </li>
        </ul>

        <!-- moet nog aangepast worden voor custom list items -->
        <!-- <slot v-else /> -->
      </tooltipEl>
    </transition>
  </div>
</template>

<script>
import inputEl from './input'
import tooltipEl from './tooltip'

export default {
  components: {
    inputEl,
    tooltipEl
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    value: Object,
    placeholder: String,
    icon: String,
    loading: Boolean,
    title: String,
    error: String,
    label: {
      type: String,
      required: true
    },
    disabled: Boolean
  },
  data() {
    return {
      showSelectMenu: false
    }
  },
  computed: {
    computedValue() {
      if (!this.value) {
        return null
      }
      return this.value[this.label]
    }
  },
  methods: {
    onInputClick() {
      this.showSelectMenu = this.disabled ? false : !this.showSelectMenu
    },
    select(option) {
      this.$emit('input', option)
      this.showSelectMenu = false
    }
  }
}
</script>

<style scoped lang="scss">
.el-select {
  position: relative;
  line-height: 1;

  @include when(loading) {
    cursor: not-allowed;
  }

  @include when(disabled) {
    cursor: not-allowed;
  }

  @include when(focused) {
    ::v-deep .el-input__content__suffix-icon svg {
      transform: rotate(-180deg);
    }
  }

  ::v-deep .el-input__content__suffix-icon svg {
    width: 0.8rem;
    transition: 0.3s;
  }

  &__options {
    position: relative;
    z-index: 1;

    ul {
      max-height: 300px;
      overflow: scroll;

      li {
        padding: 0.7rem;
        text-align: left;

        background: $select-option-background;
        transition: 0.3s;

        cursor: pointer;

        &:hover {
          background: $select-option-background--hover;
        }
      }
    }

    &__custom-input {
      padding: 0.3rem !important;

      ::v-deep .input__content {
        padding: $input-padding / 2;
      }
    }
  }
}

.tooltip {
  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: 0.5s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }
  &-enter-active {
    opacity: 0;
  }
  &-leave-active {
    opacity: 1;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
