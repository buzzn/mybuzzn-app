<template>
    <div class="counter">
        <span class="number">
          <span v-for="(num, index) in numberArray" :key="index" :class="{devide: index === 0 || index === 3, zero: num == 0}">{{num}}</span>
        </span>
        <span class="unit">{{ unit }}</span>
    </div>
</template>

<script>
export default {
  name: 'Counter',
  props: ['unit', 'number'],
  data() {
    return {
      numberArray: [],
    };
  },
  mounted() {
    this.$nextTick(() => this.spreadNumber());
  },
  methods: {
    spreadNumber() {
      const numberArray = this.number.toString().split('').reverse();
      const temp = [];
      for (let i = 6; i >= 0; i -= 1) {
        temp.push(numberArray[i] || 0);
      }
      this.numberArray = temp;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.counter {
  text-align: center;
  margin-bottom: 3em;
  position: relative;
  .number {
    font-size: 50px;
    font-weight: 500;
    background: rgba($grey-1, 0.2);
    padding: 0 5px;
    span {
      display: inline-block;
      padding: 0 4px;
      color: $production;
      &.devide {
        border-right: 1px solid rgba($grey-1, 0.3);
      }
      &.zero {
        opacity: 0.5;
        color: white;
      }
    }
  }
  .unit {
    font-size: 14px;
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translate(50%, 50%);
  }
  &.smaller {
    .number {
      font-size: 54px;
    }
  }
}
</style>
