<template>
  <div id="app" :class="{ 'open-menu': openMenu, offline: offline }">
    <off-canvas-menu :open="openMenu" @navigate="openMenu = false"></off-canvas-menu>
    <div class="container" @touchstart="openMenu ? openMenu = false : null">
      <router-view @menu="toggleMenu"/>
    </div>
    <loading :show="loading" :forceShow="true"></loading>
  </div>
</template>

<script>
import OffCanvasMenu from '@/components/OffCanvasMenu';
import Loading from '@/components/Loading';
import SocketState from './states/SocketState';

export default {
  name: 'App',
  props: {
    loading: false,
    offline: false,
  },
  components: {
    OffCanvasMenu,
    Loading,
  },
  created() {
    if (this.loading) {
      this.forceLoading = true;
    }
    this.socket.status = 'idle';
  },
  data: () => ({
    openMenu: false,
    forceLoading: false,
    socket: SocketState.state,
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
  &.offline {
    transform: translateY(30px);
  }
  &.open-menu {
    transform: translate(80vw);
    @media #{$mediaMd} {
      transform: translate(450px);
    }
    &.offline {
      transform: translate(80vw, 30px);
      @media #{$mediaMd} {
        transform: translate(450px, 30px);
      }
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
