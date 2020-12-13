<template>
  <div class="date-picker">
    <input-element
      :value="formattedSelectedDate"
      :icon="align !== 'right' ? 'calendar' : null"
      :suffix-icon="align === 'right' ? 'calendar' : null"
      :title="title"
      :error="error"
      :disabled="disabled"
      :placeholder="placeholder"
      @keydown.enter="handleEnterKeyDown"
      @mouseup.native="handleMouseUp"
      v-click-outside="() => (this.showDropdown = false)"
    />

    <transition name="transition">
      <tooltip-element
        v-if="showDropdown"
        margin=".5em"
        arrow-offset=".6em"
        :position="position"
        :align="align"
        :align-arrow="align"
      >
        <div class="date-picker__dropdown">
          <div class="date-picker__dropdown__header">
            <button-element icon="chevron-left" @click="prevMonth" />
            <span>{{ months[month - 1] }} {{ year }}</span>
            <button-element icon="chevron-right" @click="nextMonth" />
          </div>

          <ul class="date-picker__dropdown__days-of-week">
            <li v-for="day of days" :key="day">{{ day }}</li>
          </ul>

          <ul class="date-picker__dropdown__days-of-month">
            <!-- previous month -->
            <li
              v-for="i in firstDayIndentation"
              :key="`prev${i}`"
              class="date-picker__dropdown__days-of-month__previous-month"
            >
              {{ nDaysOfPreviousMonth - firstDayIndentation + i }}
            </li>

            <!-- current month -->
            <li
              v-for="day of nDaysOfMonth"
              :key="day"
              class="date-picker__dropdown__days-of-month__day"
              :class="{ 'date-picker__dropdown__days-of-month__day--selected': isSelected(day) }"
              @click="selectDate(day)"
            >
              {{ day }}
            </li>

            <!-- next month -->
            <li v-for="i in nNextMonthDays" :key="`next${i}`" class="date-picker__dropdown__days-of-month__next-month">
              {{ i }}
            </li>
          </ul>
        </div>
      </tooltip-element>
    </transition>
  </div>
</template>

<script>
import inputElement from '../input'
import tooltipElement from '../tooltip'
import buttonElement from '../button'

export default {
  components: {
    inputElement,
    tooltipElement,
    buttonElement
  },
  props: {
    /** Value */
    value: {
      type: Date,
      default: () => new Date()
    },

    /** Tooltip position (see <tooltip>) */
    position: String,

    /** Tooltip alignment (see <tooltip>) */
    align: {
      type: String,
      default: 'right'
    },

    /** Placeholder */
    placeholder: String,

    /** Title */
    title: String,

    /** Error */
    error: String,

    /** Disable input */
    disabled: Boolean
  },
  computed: {
    nDaysOfPreviousMonth() {
      return new Date(this.year, this.month === 0 ? 11 : this.month - 1, 0).getDate()
    },
    nDaysOfNextMonth() {
      return new Date(this.year, this.month === 11 ? 0 : this.month + 1, 0).getDate()
    },
    nDaysOfMonth() {
      return new Date(this.year, this.month, 0).getDate()
    },
    firstDayIndentation() {
      return new Date(`${this.year}-${this.month}-01`).getDay()
    },
    nNextMonthDays() {
      if ((this.nDaysOfMonth + this.firstDayIndentation) % 7 === 0) {
        return 0
      }
      const rows = Math.floor((this.nDaysOfMonth + this.firstDayIndentation) / 7) + 1
      return 7 * rows - this.nDaysOfMonth - this.firstDayIndentation
    },
    formattedSelectedDate() {
      const selectedDateDay = this.selectedDate.getDate()
      const selectedDateMonth = this.selectedDate.getMonth() + 1
      const selectedDateYear = this.selectedDate.getFullYear()

      return `${selectedDateMonth}-${selectedDateDay}-${selectedDateYear}`
    }
  },
  data() {
    return {
      showDropdown: false,
      selectedDate: null,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  },
  methods: {
    prevMonth() {
      this.year = this.month === 1 ? this.year - 1 : this.year
      this.month = this.month === 1 ? 12 : this.month - 1
    },
    nextMonth() {
      this.year = this.month === 12 ? this.year + 1 : this.year
      this.month = this.month === 12 ? 1 : this.month + 1
    },
    isSelected(day) {
      if (!this.selectedDate) {
        return
      }
      const selectedDateDay = this.selectedDate.getDate()
      const selectedDateMonth = this.selectedDate.getMonth() + 1
      const selectedDateYear = this.selectedDate.getFullYear()

      return selectedDateDay === day && selectedDateMonth === this.month && selectedDateYear === this.year
    },
    selectDate(day) {
      this.selectedDate = new Date(`${this.year}-${this.month}-${day}`)
      this.showDropdown = false
    },
    handleMouseUp() {
      this.showDropdown = this.disabled ? false : !this.showDropdown
    },
    handleEnterKeyDown(e) {
      const date = new Date(e.target.value)

      if (this.isValidDate(date)) {
        this.selectedDate = date
      }
    },
    isValidDate(date) {
      return date instanceof Date && !isNaN(date)
    }
  },
  watch: {
    selectedDate: function(date) {
      this.$emit('input', date)
    },
    value: {
      immediate: true,
      handler(date) {
        this.selectedDate = date

        this.month = this.selectedDate.getMonth() + 1
        this.year = this.selectedDate.getFullYear()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.date-picker {
  position: relative;
  z-index: 1;

  &__dropdown {
    padding: 1em;

    width: 300px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 1em;

      span {
        font-weight: 300;
        font-size: $font-sm;
      }

      button {
        font-size: 50%;
        background: none;
        border: none;

        ::v-deep svg {
          width: 0.5rem !important;
          height: 0.5rem !important;
          fill: $secondary-text;
        }
      }
    }

    &__days-of-week,
    &__days-of-month {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;

      li {
        padding: 0.7em;
      }
    }

    &__days-of-week {
      color: $secondary-text;
      font-size: $font-xs;
      font-weight: 300;
    }

    &__days-of-month {
      font-size: $font-sm;

      &__previous-month,
      &__next-month {
        opacity: 0.3;
      }

      &__day {
        border-radius: $border-radius;
        cursor: pointer;

        &:hover {
          background: transparentize($primary-accent, 0.9);
        }

        &--selected {
          color: $primary-accent;
          box-shadow: $box-shadow;

          &:hover {
            background: $primary-accent;
          }
        }
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
