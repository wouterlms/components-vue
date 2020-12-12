<template>
  <div class="examples">
    <fake-loader-element :finished="isFinished" :started="submitLoading" />
    <form @submit.prevent="handleSubmit">
      <h1>Create a notification</h1>

      <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: .5rem;">
        <input-element title="Title" placeholder="Title" v-model="title" />
        <input-element title="Message" placeholder="Message" v-model="message" />
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: .5rem;">
        <select-element :icon="notificationIcon" v-model="icon" label="svg" title="Icon" placeholder="Select an icon">
          <option-element
            v-for="icon of icons"
            :key="icon.svg"
            :value="icon"
            style="display: flex; align-items: center;"
          >
            <icon-element :icon="icon.path" />
            <span style="padding-left: .5rem;">{{ icon.svg }}</span>
          </option-element>
        </select-element>

        <select-element v-model="notificationType" label="type" title="Type" placeholder="Select a type">
          <option-element v-for="type of notificationTypes" :key="type.type" :value="type">
            <span :style="{ color: variables[type.color] }">{{ type.type }}</span>
          </option-element>
        </select-element>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: .5rem;">
        <input-element title="Primary action" placeholder="Button text" v-model="primaryActionTitle">
          <template slot="prepend">
            <select-element v-model="primaryActionType" label="type" :border="false" placeholder="Type">
              <option-element v-for="type of actionTypes" :key="type.type" :value="type">
                <span :style="{ color: variables[type.color] }">{{ type.type }}</span>
              </option-element>
            </select-element>
          </template>
        </input-element>

        <input-element title="Secondary action" placeholder="Button text" v-model="secondaryActionTitle">
          <template slot="prepend">
            <select-element v-model="secondaryActionType" label="type" :border="false" placeholder="Type">
              <option-element v-for="type of actionTypes" :key="type.type" :value="type">
                <span :style="{ color: variables[type.color] }">{{ type.type }}</span>
              </option-element>
            </select-element>
          </template>
        </input-element>
      </div>

      <div style="display: flex; align-items: center;">
        <switch-element
          inactive-text="Don't close automatically"
          active-text="Close after timeout"
          v-model="useTimeout"
        />
        <number-input-element
          style="width: 120px; font-size: 80%; margin-left: .5rem;"
          v-model="timeout"
          :step="100"
          :min="100"
          append=" ms"
          :disabled="!useTimeout"
        />
      </div>

      <div>
        <checkbox-element v-model="checkbox" label="A" style="margin-bottom: .4rem; font-size: 200%"
          >checkbox 1</checkbox-element
        >
        <checkbox-element v-model="checkbox" label="B" style="margin-bottom: .4rem; font-size: 150%"
          >checkbox 2</checkbox-element
        >
        <checkbox-element v-model="checkbox" label="C">checkbox 3</checkbox-element>
      </div>

      <div>
        <radio-element v-model="radio" label="A" style="margin-bottom: .4rem; font-size: 200%">radio 1</radio-element>
        <radio-element v-model="radio" label="B" style="margin-bottom: .4rem; font-size: 150%">radio 2</radio-element>
        <radio-element v-model="radio" label="C">radio 3</radio-element>
      </div>

      <div style="margin-top: 1rem; display: flex; align-items: center;">
        <button-element native-type="submit" :disabled="submitDisabled" :loading="submitLoading">
          Show notification
        </button-element>
        <button-element secondary type="danger" style="margin-left: .5rem;" @click="showModal = true">
          Show modal
        </button-element>
      </div>
    </form>

    <modal-element :show="showModal" @close="showModal = false">
      <div class="modal">
        <h1>Hold on!</h1>
        <p>
          Are you sure you want to unsubscribe? You won't be able to access any new content.
        </p>

        <div class="modal__actions">
          <button-element secondary @click="showModal = false">Cancel</button-element>
          <button-element type="danger" @click="showModal = false">I'm sure</button-element>
        </div>
      </div>
    </modal-element>
  </div>
</template>

<script>
import inputElement from '@/components/input'
import selectElement from '@/components/select'
import optionElement from '@/components/option'
import iconElement from '@/components/icon'
import buttonElement from '@/components/button'
import switchElement from '@/components/switch'
import numberInputElement from '@/components/numberInput'
import checkboxElement from '@/components/checkbox'
import radioElement from '@/components/radio'

import modalElement from '@/components/modal'
import fakeLoaderElement from '@/components/fakeLoader'

import variables from '@/assets/scss/_variables.scss'

export default {
  components: {
    inputElement,
    selectElement,
    optionElement,
    iconElement,
    buttonElement,
    switchElement,
    numberInputElement,
    modalElement,
    checkboxElement,
    radioElement,
    fakeLoaderElement
  },
  data() {
    return {
      variables: variables,
      title: 'Update available',
      message: 'A new <b style="font-weight: 500;">sortware version</b> is available for download.',
      icons: [
        {
          svg: 'padlock',
          path: 'test/padlock'
        },
        {
          svg: 'refresh',
          path: 'test/refresh'
        },
        {
          svg: 'tag',
          path: 'test/tag'
        }
      ],
      icon: null,
      notificationTypes: [
        {
          type: 'Default',
          color: 'info'
        },
        {
          type: 'Success',
          color: 'success'
        },
        {
          type: 'Warning',
          color: 'warning'
        },
        {
          type: 'Error | Danger',
          color: 'error'
        },
        {
          type: 'Does not exist',
          color: 404,
          disabled: true
        }
      ],
      notificationType: null,
      actionTypes: [
        {
          type: 'Default',
          color: 'info'
        },
        {
          type: 'Success',
          color: 'success'
        },
        {
          type: 'Warning',
          color: 'warning'
        },
        {
          type: 'Danger',
          color: 'error'
        }
      ],
      primaryActionType: null,
      secondaryActionType: null,
      primaryActionTitle: 'Install now',
      secondaryActionTitle: 'Maybe later',

      useTimeout: false,
      timeout: 3000,

      submitLoading: false,
      isFinished: false,
      showModal: false,

      checkbox: [],
      radio: 'B'
    }
  },
  computed: {
    notificationIcon() {
      if (!this.icon) {
        return
      }
      return this.icon.path
    },
    submitDisabled() {
      return false
      // return (
      //   !this.title ||
      //   !this.message ||
      //   !this.icon ||
      //   !this.notificationType ||
      //   !this.primaryActionType ||
      //   !this.primaryActionTitle ||
      //   !this.secondaryActionType ||
      //   !this.secondaryActionTitle
      // )
    }
  },
  methods: {
    async handleSubmit() {
      this.submitLoading = true
      this.isFinished = false
      await new Promise((resolve) => setTimeout(resolve, 1500))
      this.submitLoading = false
      this.isFinished = true

      this.$notification({
        title: this.title,
        message: this.message,
        type: this.notificationType?.color,
        icon: this.icon?.path,
        primaryAction: {
          title: this.primaryActionTitle,
          type: this.primaryActionType?.type.toLowerCase(),
          click: () => {
            this.responseText = 'You clicked the primary option'
          }
        },
        secondaryAction: {
          title: this.secondaryActionTitle,
          type: this.secondaryActionType?.type.toLowerCase(),
          click: () => {
            this.responseText = 'You clicked the secondary option'
          }
        },
        timeout: this.useTimeout ? this.timeout : 0
      })
    }
  }
}
</script>

<style scoped lang="scss">
.examples {
  form {
    max-width: 800px;
    margin: 0 auto;

    h1 {
      margin-bottom: 2rem;
    }

    & > div {
      margin-bottom: 0.8rem;
    }
  }
}

.modal {
  max-width: 500px;

  h1 {
    font-weight: 500;
    font-size: 1.1rem;

    margin-bottom: 0.8rem;
  }

  p {
    color: $primary-text;
    line-height: 1.4;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;

    button {
      font-size: 90%;

      &:last-of-type {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
