<template>
  <div class="time-picker">
    <select-element
      v-model="selectedTime"
      label="time"
      icon="time"
      :position="position"
      :title="title"
      :error="error"
      :disabled="disabled"
      :readonly="readonly"
      @custom-value="handleCustomValue"
    >
      <option-element v-for="time of computedTimes" :key="time.id" :value="time" class="time-picker__option">
        {{ time.time }}
      </option-element>
    </select-element>
  </div>
</template>

<script>
import selectElement from '../select'
import optionElement from '../select/option'

import emitter from '@/mixins/emitter'

export default {
  components: {
    selectElement,
    optionElement
  },
  mixins: [emitter],
  props: {
    /** Value */
    value: [Date, Object],

    /** Start */
    start: {
      type: String,
      default: '00:00'
    },

    /** End */
    end: {
      type: String,
      default: '23:45'
    },

    /** Step */
    step: {
      type: String,
      default: '01:00'
    },

    /** Custom times array */
    times: Array,

    /** Allow custom input in text field */
    readonly: Boolean,

    /** Position (see <tooltip>) */
    position: String,

    /** Title */
    title: String,

    /** Error */
    error: String,

    /** Disabled */
    disabled: Boolean
  },

  computed: {
    customTimes() {
      return this.times.map((time, i) => {
        return {
          id: i,
          time: time,
          date: this.timeToDate(time)
        }
      })
    },
    computedTimes() {
      if (this.times) {
        return this.customTimes
      }

      const hStart = +this.start.split(':')[0]
      const mStart = +this.start.split(':')[1]

      const hEnd = +this.end.split(':')[0]
      const mEnd = +this.end.split(':')[1]

      const hStep = +this.step.split(':')[0]
      const mStep = +this.step.split(':')[1]

      const minuteSpan = hEnd * 60 + mEnd - (hStart * 60 + mStart)
      const stepSpan = hStep * 60 + mStep

      const steps = Math.floor(minuteSpan / stepSpan)

      const timesList = []

      for (let i = 0; i <= steps; i++) {
        const d = new Date()

        d.setHours(hStart)
        d.setMinutes(mStart + i * stepSpan)
        d.setSeconds(0)

        timesList.push({
          id: i,
          time: this.dateToTimeString(d),
          date: d
        })
      }

      return timesList
    }
  },
  data() {
    return {
      selectedTime: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(date) {
        // if (new Date(date) instanceof Date) {
        //   console.log('YES', date)
        //   // const d = new Date()

        //   // const h = date.split(':')[0]
        //   // const m = date.split(':')[1]

        //   // d.setHours(h)
        //   // d.setMinutes(m)

        //   this.selectedTime = {
        //     time: this.dateToTimeString(date)
        //   }
        // } else {
        //   console.log('else')
        //   this.selectedTime = {
        //     time: 'test'
        //   }
        // }
        if (!date) {
          return
        }

        this.selectedTime = {
          time: this.dateToTimeString(date),
          date: date
        }
      }
    },
    selectedTime: function(time) {
      this.$emit('input', time.date)
    }
  },
  methods: {
    dateToTimeString(d) {
      return `${d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`}:${
        d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`
      }`
    },
    timeToDate(time) {
      const h = +time.split(':')[0]
      const m = +time.split(':')[1]

      const d = new Date()
      d.setHours(h)
      d.setMinutes(m)
      d.setSeconds(0)

      return d
    },
    handleCustomValue(value) {
      const validTime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value)

      if (validTime) {
        this.selectedTime = {
          time: value,
          date: this.timeToDate(value)
        }

        this.broadcast('Select', 'closeSelectMenu')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.time-picker {
  &__option {
    font-family: 'Roboto Mono', monospace;
  }
}
</style>
