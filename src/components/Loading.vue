<template>
    <div :class="{
      appear,
      show: internShow,
      disappear,
    }" class="loading-container">
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['show'],
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
        this.appear = true;
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
  &.show {
    opacity: 1;
  }
  &.appear {
    opacity: 0;
    animation: appear 200ms ease forwards;
  }
  &.disappear {
    opacity: 0;
    animation: disappear 200ms ease forwards;
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    span {
      position: absolute;
      background: black;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      top: 5px;
      left: 35%;
      opacity: 0;
      animation: scaleAndHide 4s ease infinite;
      &:nth-child(1) {
        width: 30px;
        height: 30px;
      }
      &:nth-child(2) {
        animation-delay: 2s;
        width: 7px;
        height: 7px;
        top: 10px;
        left: 73%;
      }
      &:nth-child(3) {
        animation-delay: 0.5s;
        top: 40px;
        left: 70%;
      }
      &:nth-child(4) {
        animation-delay: 1.25s;
        top: 35px;
        left: 20%;
        width: 18px;
        height: 18px;
      }

      @keyframes scaleAndHide {
        0% {
          transform: translate(-50%, -50%) scale(0.25);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.25);
          opacity: 0;
        }
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
  }
}

</style>
