<template>
  <div id="app" :class="{ 'open-menu': openMenu }">
    <off-canvas-menu :open="openMenu" @navigate="openMenu = false"></off-canvas-menu>
    <div class="container" @touchstart="openMenu ? openMenu = false : null">
      <router-view @menu="toggleMenu"/>
    </div>
    <loading :show="appLoading"></loading>
  </div>
</template>

<script>
import OffCanvasMenu from '@/components/OffCanvasMenu';
import Loading from '@/components/Loading';

export default {
  name: 'App',
  components: {
    OffCanvasMenu,
    Loading,
  },
  data: () => ({
    openMenu: false,
    appLoading: false,
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
    .container {
      opacity: 0.5;
    }
  }
  .container {
    opacity: 1;
    transition: opacity 500ms ease;
  }
}
</style>
