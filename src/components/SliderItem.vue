<template>
    <div class="slider-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'SliderItem',
};
</script>

<style lang="scss">
.slider-item {
  position: absolute;
  top: 0;
  opacity: 0;
  &.active {
    opacity: 1;
  }
  &.appear-next {
    animation: appearNext 500ms ease forwards;
  }
  &.disappear-next {
    animation: disappearNext 500ms ease forwards;
  }
  &.appear-prev {
    animation: appearPrev 500ms ease forwards;
  }
  &.disappear-prev {
    animation: disappearPrev 500ms ease forwards;
  }
  @keyframes appearNext {
    0% {
      transform: translate(100%, 0);
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes disappearNext {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: translate(-100%, 0);
      opacity: 0;
    }
  }
  @keyframes appearPrev {
    0% {
      transform: translate(-100%, 0);
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes disappearPrev {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: translate(100%, 0);
      opacity: 0;
    }
  }
}
</style>
