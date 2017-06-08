<template>
  <div class="vue-dob-picker">
    <label :class="labelClass" :style="{ flex: proportions[0] }">
      <div v-if="showLabels !== 'false'">Date</div>
      <select v-model="day" :class="selectClass">
        <option v-for="(item, index) in new Array(28)" :value="index + 1">{{ index + 1 }}</option>
        <option value="29" v-if="daysInMonth >= 29 || isLeapYear">29</option>
        <option value="30" v-if="daysInMonth >= 30">30</option>
        <option value="31" v-if="daysInMonth >= 31">31</option>
      </select>
    </label>
    <label :class="labelClass" :style="{ flex: proportions[1] }">
      <div v-if="showLabels !== 'false'">Month</div>
      <select v-model="month" :class="selectClass">
        <option v-for="(item, index) in new Array(12)" :value="index + 1">{{ getDisplayedMonth(index) }}</option>
      </select>
    </label>
    <label :class="labelClass" :style="{ flex: proportions[2] }">
      <div v-if="showLabels !== 'false'">Year</div>
      <select v-model="year" :class="selectClass">
        <option v-for="(item, index) in new Array(100)" :value="index + startingYear + 1">{{ index + startingYear + 1 }}</option>
      </select>
    </label>
  </div>
</template>

<script>
const datesInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default {
  name: 'vue-dob-picker',
  props: {
    value: {
      type: Date,
      required: true,
    },
    selectClass: String,
    labelClass: String,
    showLabels: String,
    locale: {
      type: String,
      default: navigator.language,
    },
    monthFormat: {
      type: String,
      default: '2-digit',
    },
    proportions: {
      type: Array,
      default: () => [1, 1, 2],
    },
  },
  data() {
    return {
      date: null,
      startingYear: (new Date()).getFullYear() - 100,
    };
  },
  computed: {
    day: {
      get() {
        return this.date.getDate();
      },
      set(val) {
        const newDate = new Date(this.date);
        newDate.setDate(val);
        this.date = newDate;
      },
    },
    month: {
      get() {
        return this.date.getMonth() + 1;
      },
      set(val) {
        const newDate = new Date(this.date);
        newDate.setMonth(val - 1);
        this.date = newDate;
      },
    },
    year: {
      get() {
        return this.date.getFullYear();
      },
      set(val) {
        const newDate = new Date(this.date);
        newDate.setFullYear(val);
        this.date = newDate;
      },
    },
    daysInMonth() {
      return datesInMonths[this.month - 1];
    },
    isLeapYear() {
      return ((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0);
    },
  },
  watch: {
    date() {
      this.$emit('input', this.date);
    },
  },
  methods: {
    getDisplayedMonth(monthNum) {
      const monthDateObj = new Date(2000, monthNum, 1);
      const locale = this.locale || navigator.language;
      return monthDateObj.toLocaleString(locale, { month: this.monthFormat });
    },
  },
  created() {
    this.date = this.value;
  },
};
</script>

<style scoped>
  .vue-dob-picker {
    display: flex;
  }

  label {
    display: inline-block;
    padding: 0 4px;
  }

  label:first-child {
    padding-left: 0;
  }

  label:last-child {
    padding-right: 0;
  }

  select {
    width: 100%;
  }
</style>
