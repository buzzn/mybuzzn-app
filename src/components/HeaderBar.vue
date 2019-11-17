<template>
    <header>
      <a v-if="backButton" class="back" @click="$router.go(-1)">
        <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_arrow</title><path d="M23.52,14.5H7.69L13.8,8.39a.5.5,0,0,0-.71-.71l-7,7a.36.36,0,0,0-.11.16.47.47,0,0,0,0,.38.36.36,0,0,0,.11.16l7,7a.49.49,0,0,0,.35.14.5.5,0,0,0,.36-.14.51.51,0,0,0,0-.71L7.69,15.5H23.52a.5.5,0,0,0,0-1Z"/></svg>
      </a>
      <a v-if="!backButton" class="menu-toggle" @click="$emit('menu')">
        <span></span>
      </a>
      <h1>
        <slot></slot>
      </h1>
      <a v-if="$router.currentRoute.name === 'MyBuzzn'" @click="$router.push({ name: 'OurBuzzn' })" class="view-toggle">
        <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_spheres</title><path d="M19.88,16a3.1,3.1,0,0,0-.62.07,6.79,6.79,0,1,0-6.15,3.6,2.21,2.21,0,0,0-.35,1.19,2.3,2.3,0,0,0,4.33,1.1,3.64,3.64,0,1,0,2.79-6ZM7.48,12.87a5.79,5.79,0,1,1,5.78,5.78A5.79,5.79,0,0,1,7.48,12.87Zm7.59,9.28a1.31,1.31,0,1,1,1.31-1.31A1.31,1.31,0,0,1,15.07,22.15Zm4.81.12a2.65,2.65,0,1,1,2.64-2.65A2.65,2.65,0,0,1,19.88,22.27Z"/></svg>
      </a>
      <a v-if="$router.currentRoute.name === 'OurBuzzn'" @click="$router.push({ name: 'MyBuzzn' })" class="view-toggle">
        <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_mybuzzn</title><path d="M24.09,26.4H14.45a1.53,1.53,0,0,1-1.53-1.53v-6.2a1,1,0,0,0-1-1H10.4a1,1,0,0,0-1,1v6.2A1.53,1.53,0,0,1,7.9,26.4H6a1.25,1.25,0,0,1-1.25-1.26V13a1.27,1.27,0,0,1,.41-.93l9.05-8.25a1.26,1.26,0,0,1,1.69,0l9.06,8.25a1.27,1.27,0,0,1,.41.93v12.1A1.25,1.25,0,0,1,24.09,26.4ZM10.4,16.7H12a2,2,0,0,1,2,2v6.2a.53.53,0,0,0,.53.53h9.64a.26.26,0,0,0,.25-.26V13a.27.27,0,0,0-.08-.19L15.2,4.6a.25.25,0,0,0-.34,0L5.8,12.85a.27.27,0,0,0-.08.19v12.1A.26.26,0,0,0,6,25.4H7.9a.53.53,0,0,0,.53-.53v-6.2A2,2,0,0,1,10.4,16.7Z"/><path d="M19.65,22.05H18.11a2,2,0,0,1-2-2v-1.4a2,2,0,0,1,2-2h1.54a2,2,0,0,1,2,2v1.4A2,2,0,0,1,19.65,22.05ZM18.11,17.7a1,1,0,0,0-1,1v1.4a1,1,0,0,0,1,1h1.54a1,1,0,0,0,1-1v-1.4a1,1,0,0,0-1-1Z"/></svg>
      </a>
      <div v-if="$router.currentRoute.name !== 'MyBuzzn' && $router.currentRoute.name !== 'OurBuzzn'" class="placeholder"></div>
    </header>
</template>

<script>
import AuthState from '../states/AuthState';

export default {
  name: 'HeaderBar',
  props: {
    backButton: false,
  },
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
  padding: 0 15px 0 20px;
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

  .placeholder,
  .back,
  .view-toggle {
    width: 30px;
    height: 30px;
    display: block;
  }

  h1 {
    margin: 0;
    text-align: center;
    flex: 1;
    font-size: 16px;
  }
}
</style>
