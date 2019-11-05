<template>
    <header>
      <a class="menu-toggle" @click="$emit('menu')">
        <span></span>
      </a>
      <h1>
        <slot></slot>
      </h1>
    </header>
</template>

<script>
import AuthState from '../states/AuthState';

export default {
  name: 'HeaderBar',
  data: () => ({
    auth: AuthState.state,
  }),
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

header {
  background: rgba($white, 0.85);
  height: $headerHeight;
  border: 1px solid $grey-2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: fadeDown 800ms ease forwards;
  box-sizing: border-box;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  z-index: 50;

  .menu-toggle {
    width: 20px;
    height: 20px;
    display: block;
    position: relative;
    span {
      display: block;
      height: 2px;
      position: absolute;
      top: 50%;
      width: 100%;
      background: $black;
      &:before,
      &:after {
        content: '';
        display: block;
        height: 2px;
        position: absolute;
        background: $black;
        width: 100%;
        bottom: -6px;
      }
      &:before {
        top: -6px;
      }
    }
  }

  h1 {
    margin: 0;
    text-align: center;
    flex: 1;
    font-size: 16px;
  }
}
</style>
