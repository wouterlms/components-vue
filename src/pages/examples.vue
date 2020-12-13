<template>
  <div>
    <notifications-element />
    <!-- icon -->
    <section>
      <h1>Icon</h1>

      <ul class="props">
        <li v-for="(prop, i) in icon.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <icon-element icon="test/padlock" />
        <icon-element icon="test/refresh" />
        <icon-element icon="test/search" />
        <icon-element icon="test/notification" />
      </div>
    </section>

    <!-- tooltip -->
    <section>
      <h1>Tooltip</h1>

      <ul class="props">
        <li v-for="(prop, i) in tooltip.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <span class="tooltip-wrapper">
          Tooltip under me

          <tooltip-element margin="0.5em">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>

        <span class="tooltip-wrapper">
          Tooltip above me

          <tooltip-element margin="0.5em" position="top">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>

        <span class="tooltip-wrapper">
          Tooltip align left

          <tooltip-element margin="0.5em" align="left">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>

        <span class="tooltip-wrapper">
          Tooltip align right

          <tooltip-element margin="0.5em" position="top" align="right">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>

        <span class="tooltip-wrapper">
          Tooltip & arrow align left

          <tooltip-element margin="0.5em" align="left" align-arrow="left" arrow-offset="5px">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>

        <span class="tooltip-wrapper">
          Tooltip & arrow align right

          <tooltip-element margin="0.5em" position="top" align="right" align-arrow="right" arrow-offset="5px">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>
      </div>

      <div class="row" style="margin-top: 5rem;">
        <span class="tooltip-wrapper">
          Tooltip under me, with margin

          <tooltip-element margin="1em">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>

        <span class="tooltip-wrapper">
          Tooltip under me which takes up 100% of the parent width

          <tooltip-element margin="1em" width="100%">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>

        <span class="tooltip-wrapper">
          Tooltip under me with a bigger arrow

          <tooltip-element margin="1em" arrow-size="1em">
            <div class="tooltip-content">
              <span>I'm a tooltip</span>
            </div>
          </tooltip-element>
        </span>
      </div>
    </section>

    <!-- button -->
    <section>
      <h1>Button</h1>

      <ul class="props">
        <li v-for="(prop, i) in button.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <button-element icon="test/padlock">Default</button-element>
        <button-element icon="test/padlock" type="success">Success</button-element>
        <button-element icon="test/padlock" type="warning">Warning</button-element>
        <button-element icon="test/padlock" type="danger">Danger</button-element>
      </div>

      <div class="row">
        <button-element suffix-icon="test/padlock" secondary>Default</button-element>
        <button-element suffix-icon="test/padlock" secondary type="success">Success</button-element>
        <button-element suffix-icon="test/padlock" secondary type="warning">Warning</button-element>
        <button-element suffix-icon="test/padlock" secondary type="danger">Danger</button-element>
      </div>

      <div class="row">
        <button-element secondary loading>Default</button-element>
        <button-element secondary type="success" loading>Success</button-element>
        <button-element secondary type="warning" loading>Warning</button-element>
        <button-element secondary type="danger" loading>Danger</button-element>
      </div>

      <div class="row">
        <button-element secondary rounded>Default</button-element>
        <button-element secondary rounded type="success">Success</button-element>
        <button-element secondary rounded type="warning">Warning</button-element>
        <button-element secondary rounded type="danger">Danger</button-element>
      </div>

      <div class="row">
        <button-element round icon="test/padlock"></button-element>
        <button-element round type="success" icon="test/padlock"></button-element>
        <button-element round type="warning" icon="test/padlock"></button-element>
        <button-element round type="danger" icon="test/padlock"></button-element>
      </div>

      <div class="row">
        <button-element secondary round icon="test/padlock"></button-element>
        <button-element secondary round type="success" icon="test/padlock"></button-element>
        <button-element secondary round type="warning" icon="test/padlock"></button-element>
        <button-element secondary round type="danger" icon="test/padlock"></button-element>
      </div>
    </section>

    <!-- input -->
    <section>
      <h1>Input</h1>

      <ul class="props">
        <li v-for="(prop, i) in input.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <input-element icon="test/padlock" placeholder="Placeholder" class="w-350" title="Simple input" />
        <input-element suffix-icon="test/padlock" placeholder="Placeholder" class="w-350" title="Input" error="Error" />
        <input-element placeholder="Placeholder" class="w-350" title="Disabled input" disabled />
      </div>

      <div class="row">
        <input-element placeholder="Input loading" class="w-350" loading></input-element>

        <input-element placeholder="prepend & append" class="w-350">
          <template slot="prepend">
            <span class="prepend">www.</span>
          </template>
          <template slot="append">
            <span class="append">.com</span>
          </template>
        </input-element>

        <input-element class="w-350" placeholder="Input with select" icon="test/padlock" suffix-icon="test/padlock">
          <template slot="prepend">
            <select-element placeholder="Select" :border="false" label="option" :options="options" v-model="option" />
          </template>
        </input-element>
      </div>

      <div class="row">
        <input-element type="password" class="w-350" placeholder="Password input" />
        <input-element type="textarea" class="w-350" placeholder="Textarea input" resize="vertical" />
      </div>
    </section>

    <!-- number input -->
    <section>
      <h1>Number input (in development)</h1>

      <ul class="props">
        <li v-for="(prop, i) in numberInput.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <number-input-element title="Simple number input" v-model="number" class="w-150" />
        <number-input-element title="Input" error="Error" v-model="number" class="w-150" />
        <number-input-element title="Disabled input" disabled v-model="number" class="w-150" />
        <number-input-element title="Input with step" v-model="number" class="w-150" :step="5" />
        <number-input-element title="Input with precision" v-model="number" class="w-150" :step="0.2" :precision="2" />
      </div>
    </section>

    <!-- select -->
    <section>
      <h1>Select</h1>

      <ul class="props">
        <li v-for="(prop, i) in select.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <select-element
          placeholder="Select"
          :options="options"
          v-model="option"
          label="option"
          title="Simple select"
          icon="test/padlock"
          class="w-350"
        />
        <select-element
          placeholder="Select"
          :options="options"
          v-model="option"
          label="option"
          title="Select"
          error="Error"
          icon="test/padlock"
          class="w-350"
        />
        <select-element
          placeholder="Select"
          :options="options"
          v-model="option"
          label="option"
          title="Disabled select"
          icon="test/padlock"
          class="w-350"
          disabled
        />
      </div>

      <div class="row">
        <select-element
          placeholder="Select"
          :options="options"
          v-model="option"
          label="option"
          title="Select loading"
          icon="test/padlock"
          class="w-350"
          loading
        />
        <select-element
          v-model="customOption"
          placeholder="Select an icon"
          label="name"
          title="Select with custom options"
          class="w-350"
        >
          <template slot="prepend" v-if="customOption">
            <icon-element class="prepend-icon" :icon="customOption.path" />
          </template>
          <option-element v-for="option of customOptions" :key="option.name" :value="option" class="option">
            <icon-element :icon="option.path" />
            <div class="option__content">
              <span class="option__content__name">{{ option.name }}</span>
              <span class="option__content__sub">{{ option.subtitle }}</span>
            </div>
          </option-element>
        </select-element>

        <select-element
          placeholder="Select at top"
          position="top"
          :options="options"
          v-model="option"
          label="option"
          title="Select"
          icon="test/padlock"
          class="w-350"
        />
      </div>
    </section>

    <!-- checkbox -->
    <section>
      <h1>Checkbox</h1>

      <ul class="props">
        <li v-for="(prop, i) in checkbox.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <div class="w-350">
          <checkbox-element v-model="singleCheckbox">Simple checkbox</checkbox-element>
          <checkbox-element v-model="singleCheckbox" error="error" style="margin-top: 1rem;">
            Checkbox error
          </checkbox-element>
        </div>
        <input-wrapper-element title="Checkbox group">
          <checkbox-element v-model="checkboxes" label="A">Checkbox A</checkbox-element>
          <checkbox-element v-model="checkboxes" label="B">Checkbox B</checkbox-element>
          <checkbox-element v-model="checkboxes" label="C" disabled>Checkbox C</checkbox-element>
          <checkbox-element v-model="checkboxes" label="D">Checkbox D</checkbox-element>
        </input-wrapper-element>
      </div>
    </section>

    <section>
      <h1>Radio</h1>

      <ul class="props">
        <li v-for="(prop, i) in radio.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <div class="w-350">
          <radio-element v-model="radioValue" label="A">Simple radio</radio-element>
          <radio-element v-model="radioValue" label="B" error="error" style="margin-top: 1rem;">
            Radio error
          </radio-element>
        </div>
        <input-wrapper-element title="Radio group">
          <radio-element v-model="radioValue" label="A">Radio A</radio-element>
          <radio-element v-model="radioValue" label="B">Radio B</radio-element>
          <radio-element v-model="radioValue" label="C" disabled>Radio C</radio-element>
          <radio-element v-model="radioValue" label="D">Radio D</radio-element>
        </input-wrapper-element>
      </div>
    </section>

    <section>
      <h1>Switch</h1>

      <ul class="props">
        <li v-for="(prop, i) in switchElement.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <switch-element v-model="switchValue" inactive-text="Inactive" active-text="Active" class="w-350" />
        <switch-element
          v-model="switchValue"
          inactive-text="Inactive"
          active-text="Active"
          error="Error"
          class="w-350"
        />

        <switch-element v-model="switchValue" inactive-text="Inactive" active-text="Active" disabled class="w-350" />
      </div>
    </section>

    <section>
      <h1>Color picker</h1>

      <ul class="props">
        <li v-for="(prop, i) in colorPicker.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <div class="w-350">
          <color-picker-element v-model="color" align="left" position="bottom" />
        </div>
        <div class="w-350">
          <color-picker-element v-model="color" position="top" />
        </div>
        <color-picker-element v-model="color" position="top" align="right" />
      </div>
    </section>

    <section>
      <h1>Modal</h1>

      <ul class="props">
        <li v-for="(prop, i) in modal.props" :key="i">
          <span class="prop">{{ i }}</span>
        </li>
      </ul>

      <div class="row">
        <button-element @click="showModal = true">Show modal</button-element>
        <modal-element :show="showModal" @close="showModal = false"> Modal content slot </modal-element>
      </div>
    </section>

    <section>
      <h1>Notification</h1>

      <ul class="props">
        <li>
          <span class="prop">title</span>
        </li>
        <li>
          <span class="prop">message</span>
        </li>
        <li>
          <span class="prop">icon</span>
        </li>
        <li>
          <span class="prop">type</span>
        </li>
        <li>
          <span class="prop">timeout</span>
        </li>
        <li>
          <span class="prop">primaryAction</span>
        </li>
        <li>
          <span class="prop">secondaryAction</span>
        </li>
      </ul>

      <div class="row">
        <button-element @click="showDefaultNotification">Default notification</button-element>
        <button-element @click="showSuccessNotification" type="success">Success notification</button-element>
        <div style="position: relative">
          <button-element @click="showWarningNotification" type="warning" style="margin: 0;"
            >Warning notification</button-element
          >
          <tooltip-element width="100%" margin=".5rem">
            <div class="tooltip-content">
              This notification will not close automatically
            </div>
          </tooltip-element>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import notificationsElement from '@/components/notifications'
import tooltipElement from '@/components/tooltip'
import iconElement from '@/components/icon'
import buttonElement from '@/components/button'
import inputElement from '@/components/input'
import selectElement from '@/components/select'
import optionElement from '@/components/select/option'
import numberInputElement from '@/components/numberInput'
import checkboxElement from '@/components/checkbox'
import inputWrapperElement from '@/components/inputWrapper'
import radioElement from '@/components/radio'
import switchElement from '@/components/switch'
import colorPickerElement from '@/components/colorPicker'
import modalElement from '@/components/modal'

import variables from '@/assets/scss/_variables.scss'

export default {
  components: {
    notificationsElement,
    tooltipElement,
    buttonElement,
    inputElement,
    selectElement,
    optionElement,
    iconElement,
    numberInputElement,
    checkboxElement,
    inputWrapperElement,
    radioElement,
    switchElement,
    colorPickerElement,
    modalElement
  },
  data() {
    return {
      icon: iconElement,
      tooltip: tooltipElement,
      button: buttonElement,
      input: inputElement,
      select: selectElement,
      numberInput: numberInputElement,
      checkbox: checkboxElement,
      radio: radioElement,
      switchElement: switchElement,
      colorPicker: colorPickerElement,
      modal: modalElement,

      showTooltip: false,

      options: [{ option: 'Option 1' }, { option: 'Option 2' }],
      option: null,

      customOptions: [
        {
          name: 'Padlock.svg',
          subtitle: 'Padlock icon',
          path: 'test/padlock'
        },
        {
          name: 'Refresh.svg',
          subtitle: 'Refresh icon',
          path: 'test/refresh'
        },
        {
          name: 'Search.svg',
          subtitle: 'Search icon',
          path: 'test/search'
        }
      ],
      customOption: null,
      number: 0,
      singleCheckbox: false,
      checkboxes: [],

      radioValue: null,

      switchValue: false,

      color: variables.primaryAccent,

      showModal: false
    }
  },
  methods: {
    showDefaultNotification() {
      this.$notification({
        title: 'Update',
        message: 'There is an update ready to be installed',
        icon: 'test/refresh',
        primaryAction: {
          title: 'Update now',
          click: () => {
            console.log('You clicked the primary action')
          }
        },
        secondaryAction: {
          title: "I'm busy",
          click: () => {
            console.log('You clicked the secondary action')
          }
        }
      })
    },
    showSuccessNotification() {
      this.$notification({
        title: "You're in luck!",
        message: 'We\'ve found a buyer for your <b style="font-weight: 500">Opel Corsa</b>.',
        icon: 'test/search',
        type: 'success',
        secondaryAction: {
          title: 'Contact buyer',
          type: 'success',
          click: () => {
            console.log('You clicked the secondary action')
          }
        }
      })
    },
    showWarningNotification() {
      this.$notification({
        title: 'Warning',
        message:
          "You've almost reached your daily limit, once you do you will have to pay to continue using our service.",
        type: 'warning',
        timeout: 0,
        secondaryAction: {
          title: 'Upgrade Now',
          type: 'warning',
          click: () => {
            console.log('You clicked the secondary action')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
section {
  margin-bottom: 5rem;
  h1 {
    font-weight: 600;
    font-size: 1.4rem;
  }
}

.row {
  display: flex;
  align-items: center;

  margin-bottom: 1rem;

  *:not(:last-child) {
    margin-right: 0.5rem;
  }

  .w-350 {
    width: 350px;
  }

  .w-150 {
    width: 150px;
  }
}

.props {
  margin: 1rem 0 3rem 0;

  li {
    display: flex;
    align-items: center;

    .prop {
      font-size: $font-sm;
      color: $primary-text;
      background-color: #f9fafc;
      border: 1px solid #eaeefb;

      padding: 4px;
      border-radius: 4px;
    }

    .type {
      margin-left: 5px;
      font-size: $font-xs;
      color: $secondary-text;
    }

    &:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }
  }
}

.prepend {
  padding: $input-padding;
  background: $input-background-color--disabled;
  border-right: 1px solid $border-color;
  line-height: 1.5;
  border-radius: $border-radius 0 0 $border-radius;
  color: $input-placeholder-color;
}

.append {
  padding: $input-padding;
  background: $input-background-color--disabled;
  border-left: 1px solid $border-color;
  line-height: 1.5;
  border-radius: 0 $border-radius $border-radius 0;
  color: $input-placeholder-color;
}

.prepend-icon {
  padding-left: $input-padding;
}

.option {
  display: flex;
  align-items: center;
  margin: 0 !important;

  &__content {
    display: flex;
    flex-direction: column;

    &__name {
      margin-bottom: 0.3rem;
    }

    &__sub {
      font-size: $font-xs;
      color: $secondary-text;
    }
  }
}

.tooltip-wrapper {
  position: relative;
  padding: 0.4rem;
  border: 1px solid $border-color;
  border-radius: $border-radius;

  margin-right: 5rem;
}

.tooltip-content {
  padding: 0.5rem;

  span {
    white-space: nowrap;
  }
}
</style>
