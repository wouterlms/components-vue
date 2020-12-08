<template>
  <inputWrapper
    class="el-tag-input"
    :class="{
      'state-disabled': disabled,
      'state-error': error
    }"
  >
    <div class="el-tag-input__content" @click="handleContentClick">
      <slot name="prepend" />
      <inputEl
        ref="input"
        v-model="tag"
        :placeholder="placeholder"
        :disabled="disabled"
        :minlength="minlength"
        :maxlength="maxlength"
        :error="error"
        @keydown="handleKeyDown"
      >
        <template slot="prepend">
          <!-- prepend -->
          <slot name="prepend" />

          <!-- prefix icon -->
          <div v-if="icon" class="el-tag-input__content__icon">
            <iconEl :icon="icon" />
          </div>

          <tagEl
            v-for="(tag, i) of tags"
            :key="i"
            :show-remove="true"
            :single-line="true"
            :disabled="disabled"
            :error="!!error"
            @remove="removeTag(tag)"
          >
            {{ tag }}
          </tagEl>
        </template>

        <template slot="append">
          <!-- suffix icon -->
          <div v-if="suffixIcon" class="el-tag-input__content__suffix-icon">
            <iconEl :icon="suffixIcon" />
          </div>
          <div class="el-tag-input__content__loader" v-if="loading">
            <loaderEl />
          </div>
          <slot name="append" />
        </template>
      </inputEl>
    </div>
  </inputWrapper>
</template>

<script>
import inputWrapper from './inputWrapper'
import inputEl from './input'
import iconEl from './icon'
import tagEl from './tag'
import loaderEl from './loader'

export default {
  components: {
    inputWrapper,
    tagEl,
    inputEl,
    iconEl,
    loaderEl
  },
  props: {
    placeholder: String,
    tags: {
      type: Array,
      required: true
    },
    disabled: Boolean,
    minlength: {
      type: Number,
      default: 0
    },
    maxlength: {
      type: Number,
      default: Infinity
    },
    title: String,
    error: String,
    loading: Boolean,
    singleLine: Boolean,
    maxTags: {
      type: Number,
      default: Infinity
    },
    icon: String,
    suffixIcon: String
  },
  data() {
    return {
      keycodes: [13, 188],
      tag: null
    }
  },
  computed: {
    computedMaxLength() {
      if (!this.maxTags) {
        return this.maxlength
      }

      return this.tags.length < this.maxTags ? this.maxlength : 0
    },
    tagsStyle() {
      return {
        // 'flex-wrap': this.singleLine ? 'nowrap' : 'wrap',
        // 'white-space': this.singleLine ? 'nowrap' : 'auto',
        // overflow: this.singleLine ? 'scroll' : 'auto'
      }
    }
  },
  watch: {
    tags: function(value) {
      this.$emit('input', value)
    },
    value: function(value) {
      this.tags = value
    }
  },

  methods: {
    handleKeyDown(e) {
      if (this.keycodes.indexOf(e.keyCode) !== -1) {
        e.preventDefault()
        this.addTag()
      }

      if (e.keyCode === 8) {
        if (!this.tag) {
          this.tags.pop()
        }
      }
    },

    handleContentClick(e) {
      const classList = [...e.target.classList]
      if (classList.includes('tag-input__content') || classList.includes('tag-input__content__icon')) {
        this.$refs.input.focus()
      }
    },

    addTag() {
      if (
        this.tag &&
        this.tag.length >= this.minlength &&
        this.tags.length < this.maxTags &&
        this.tags.indexOf(this.tag) === -1
      ) {
        this.tags.push(this.tag)
        this.tag = null

        if (this.singleLine) {
          this.$nextTick(() => {
            this.$refs.tags.scrollLeft = this.$refs.tags.scrollWidth
          })
        }
      }
    },

    removeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },

    onClick(e) {
      const classList = [...e.target.classList]
      if (classList.includes('el-tag-input__content') || classList.includes('el-tag-input__content__icon')) {
        this.$refs.input.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-tag-input {
  @include when(disabled) {
    .el-tag-input {
      &__content {
        cursor: not-allowed;

        &__tags {
          overflow: hidden;
          padding: $input-padding / 1.5 0 $input-padding / 1.5;
        }
      }
    }
  }

  @include when(error) {
    .el-tag-input {
      &__content {
        &__icon,
        &__suffix-icon {
          fill: $error;
        }
      }
    }
  }

  &__content {
    display: flex;
    width: 100%;

    &__tags {
      // @include scroll-bar;

      display: flex;
      flex-wrap: wrap;

      height: 100%;

      padding: $input-padding / 1.5 0 calc(#{$input-padding / 1.5} - 3px) $input-padding; // scrollbar height = 3px
      box-sizing: border-box;
    }

    &__icon,
    &__suffix-icon {
      fill: $input-placeholder-color;
      line-height: 0;
    }

    &__icon {
      margin-left: $input-padding;
      padding-right: $input-padding;
    }

    &__suffix-icon {
      margin-right: $input-padding;
    }

    &__icon + &__tags {
      padding-left: 0;
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

    ::v-deep .el-input {
      &__content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        overflow: scroll;

        // padding: $input-padding / 4;

        input {
          flex-grow: 1;
          width: 1%;
          min-width: 60px;
          padding: $input-padding;
        }
      }
    }
  }
}
</style>
