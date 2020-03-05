<template>
    <div class="loader" :class="{ white: white }">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
</template>

<script>
export default {
  name: 'LoadingIcon',
  props: ['white'],
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

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
  }

  &.white {
    span {
      background: white;
    }
  }
}

</style>
