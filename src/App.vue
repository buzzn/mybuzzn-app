<template>
  <div id="app" :class="{ 'open-menu': openMenu }">
    <off-canvas-menu :open="openMenu" @navigate="openMenu = false"></off-canvas-menu>
    <div class="container" >
      <router-view @menu="toggleMenu"/>
    </div>
  </div>
</template>

<script>
import OffCanvasMenu from './components/OffCanvasMenu';

export default {
  name: 'App',
  components: {
    OffCanvasMenu,
  },
  data: () => ({
    openMenu: false,
  }),
  methods: {
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/index';

#app {
  transition: transform 500ms ease;
  &.open-menu {
    transform: translate(80vw);
    @media #{$mediaMd} {
      transform: translate(450px);
    }
  }
}
</style>
