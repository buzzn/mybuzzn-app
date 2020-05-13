<template>
    <div class="great-number">
        <span ref="number" class="number"></span>
        <span ref="unit" class="unit">{{ unit }}</span>
    </div>
</template>

<script>
import { CountUp } from 'countup.js';

export default {
  name: 'GreatNumber',
  props: ['unit', 'number'],
  data() {
    return {
      countUp: null,
    };
  },
  watch: {
    number() {
      this.countUp.update(this.number);
    },
  },
  mounted() {
    this.countUp = new CountUp(this.$refs.number, this.number, { separator: '.' });
    this.countUp.start();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/animations";

.great-number {
  text-align: center;
  .number {
    font-size: 72px;
    font-weight: 500;
  }
  &.smaller {
    .number {
      font-size: 54px;
    }
  }
}
</style>
