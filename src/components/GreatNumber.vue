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
@import "../assets/scss/variables";
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
  &.live {
    .unit {
      //animation: liveNumber 2000ms ease infinite;
      display: inline-block;
    }
    .number {
      display: inline-block;
      position: relative;
      &:after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background: $error;
        position: absolute;
        top: 6px;
        left: 0px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      &:before {
        content: '';
        display: block;
        width: 14px;
        height: 14px;
        position: absolute;
        top: 6px;
        left: 0;
        border-radius: 50%;
        border: 2px solid $error;
        transform: translate(-50%, -50%);
        animation: liveIcon 2000ms ease infinite;
      }
      @keyframes liveIcon {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.6);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.1);
        }
     }
      @keyframes liveNumber {
        100%, 0% {
          // opacity: 0.8;
          transform: scale(1);
        }
        50% {
          // opacity: 1;
          transform: scale(0.95);
        }
     }
    }
  }
}
</style>
