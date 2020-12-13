<template>
  <div class="color-picker">
    <div
      class="color-picker__selector"
      :style="{
        background: valueAsRgb
      }"
      @click="showColorPicker = !showColorPicker"
      v-click-outside="() => (showColorPicker = false)"
    ></div>

    <transition name="transition">
      <tooltip-element
        margin=".5em"
        v-if="showColorPicker"
        :position="position"
        :align="align"
        :align-arrow="align"
        arrow-offset=".6em"
      >
        <div class="color-picker__dropdown">
          <div class="color-picker__dropdown__selection">
            <!-- color panel -->
            <color-panel
              class="color-picker__dropdown__panel"
              :hue="hue"
              :color="colorAsHsv"
              @color="handleSetColor"
            ></color-panel>

            <!-- color slider -->
            <color-slider class="color-picker__dropdown__slider" :color="colorAsHsv" @hue="handleSetHue"></color-slider>
          </div>
          <div class="color-picker__dropdown__footer">
            <!-- hex / rgb select -->
            <select-element
              :options="colorOptions"
              v-model="selectedColorOption"
              label="name"
              class="color-picker__dropdown__footer__select"
              position="top"
            />

            <!-- rgb -->
            <input-element
              v-if="selectedColorOption.name === 'rgb'"
              :value="valueAsRgb"
              class="color-picker__dropdown__footer__input"
              @keydown.enter="handleRgbEnter"
            />

            <!-- hex -->
            <input-element
              v-else-if="selectedColorOption.name === 'hex'"
              :value="valueAsHex"
              class="color-picker__dropdown__footer__input"
              @keydown.enter="handleHexEnter"
            />

            <!-- select -->
            <button-element secondary @click="showColorPicker = false">Select</button-element>
          </div>
        </div>
      </tooltip-element>
    </transition>
  </div>
</template>

<script>
import tooltipElement from '../tooltip'
import colorPanel from './colorPanel'
import colorSlider from './colorSlider'
import inputElement from '../input'
import selectElement from '../select'
import buttonElement from '../button'

import { rgbObjectToString, rgbToHex, hexToRgb, rgbToHsv, isValidRgb, isValidHex, rgbStringToObject } from './color'

export default {
  components: {
    tooltipElement,
    colorPanel,
    colorSlider,
    inputElement,
    selectElement,
    buttonElement
  },
  props: {
    /** Color value */
    value: String,

    /** Tooltip position (see <tooltip>) */
    position: String,

    /** Tooltip alignment (see <tooltip>) */
    align: String
  },
  computed: {
    valueAsRgb() {
      return rgbObjectToString(this.color)
    },
    valueAsHex() {
      return rgbToHex(this.color.r, this.color.g, this.color.b)
    },
    colorAsHsv() {
      return rgbToHsv(this.color.r, this.color.g, this.color.b)
    }
  },
  data() {
    return {
      showColorPicker: false,
      color: hexToRgb(this.value),
      hue: 0,
      colorOptions: [{ name: 'rgb' }, { name: 'hex' }],
      selectedColorOption: { name: 'rgb' }
    }
  },
  watch: {
    valueAsHex: function(hex) {
      this.$emit('input', hex)
    },
    value: function(value) {
      this.color = hexToRgb(value)
    }
  },
  methods: {
    handleSetHue(hue) {
      this.hue = hue
    },
    handleSetColor(rgb) {
      this.color = rgb
    },
    handleRgbEnter(e) {
      const rgb = e.target.value

      if (isValidRgb(rgb)) {
        this.color = rgbStringToObject(rgb)
      }
    },
    handleHexEnter(e) {
      const hex = e.target.value

      if (isValidHex(hex)) {
        this.color = hexToRgb(hex)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.color-picker {
  position: relative;
  width: 2em;
  height: 2em;

  padding: 0.2em;
  border-radius: $border-radius;
  box-shadow: $box-shadow;

  z-index: 1;

  &__selector {
    background: #000;
    border-radius: $border-radius-sm;
    width: 100%;
    height: 100%;

    cursor: pointer;
  }

  &__dropdown {
    width: 400px;
    padding: 0.5em;

    &__selection {
      display: flex;
      height: 300px;
    }

    &__panel,
    &__slider {
      height: 100%;
    }

    &__panel {
      flex: 0.97;
    }

    &__slider {
      flex: 0.03;
      margin-left: 0.5em;
    }

    &__footer {
      display: grid;
      grid-template-columns: 0.3fr 0.4fr 0.3fr;

      margin-top: 0.5em;

      &__input,
      &__select,
      button {
        font-size: 80%;
      }

      &__input {
        margin-left: 0.5em;
      }

      button {
        width: 80px;
        margin-left: auto;
      }
    }
  }
}

.transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }
  &-enter-active {
    opacity: 0;
  }
  &-leave-active {
    opacity: 1;
    pointer-events: none;
  }
  &-leave-to {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
