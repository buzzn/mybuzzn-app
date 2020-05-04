<template>
    <div class="great-number">
        <span class="number"><slot></slot></span>
        <span class="unit">{{ unit }}</span>
    </div>
</template>

<script>
export default {
  name: 'GreatNumber',
  props: ['unit'],
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
