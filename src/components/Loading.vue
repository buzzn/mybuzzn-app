<template>
    <div :class="{
      appear,
      show: internShow,
      disappear,
    }" class="loading-container">
      <loading-icon></loading-icon>
    </div>
</template>

<script>
import LoadingIcon from './LoadingIcon';

export default {
  name: 'Loading',
  components: {
    LoadingIcon,
  },
  props: ['show', 'forceShow'],
  data() {
    return {
      appear: false,
      disappear: false,
    };
  },
  computed: {
    isAnimating() {
      return this.appear || this.disappear;
    },
    internShow() {
      return this.show || this.appear || this.disappear;
    },
  },
  mounted() {
    this.$watch(() => this.show, this.showAndHide);
    this.showAndHide(this.show);
  },
  methods: {
    showAndHide(value) {
      if (value) {
        this.appear = !this.forceShow;
        setTimeout(() => {
          this.appear = false;
        }, 200);
      } else {
        this.disappear = true;
        setTimeout(() => {
          this.disappear = false;
        }, 200);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.loading-container {
  position: fixed;
  z-index: 550;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-image: $solarGradient;
  visibility: hidden;
  display: none;
  &.show {
    display: block;
    opacity: 1;
    visibility: visible;
  }
  &.appear {
    display: block;
    opacity: 0;
    animation: appear 200ms ease forwards;
  }
  &.disappear {
    display: block;
    opacity: 0;
    animation: disappear 200ms ease forwards;
  }
  @keyframes appear {
    0% {
      visibility: visible;
      opacity: 0;
      transform: scale(2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes disappear {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    99% {
      visibility: visible;
    }
    100% {
      opacity: 0;
      transform: scale(2);
      visibility: hidden;
    }
  }
}

</style>
