<template>
  <div ref="list" class="slider-container" >
    <div :style="{ height: listHeight + 'px' }">
      <slot></slot>
    </div>
    <div class="dots" ref="dots">
      <span v-for="dot in maxItems" :key="dot" @touchstart="() => currentIndex = dot-1"></span>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs';

export default {
  name: 'SliderContainer',
  data() {
    return {
      maxItems: 0,
      currentIndex: 0,
      listHeight: 0,
      forceDir: null,
    };
  },
  watch: {
    currentIndex() {
      this.switchItem();
    },
  },
  mounted() {
    this.calculateMaxItems();
    if (this.maxItems) {
      this.$nextTick(() => {
        this.switchItem();
      });
      this.addTouchEvents();
    }
  },
  methods: {
    next() {
      if (this.currentIndex >= this.maxItems - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
      this.forceDir = 'next';
    },
    prev() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.maxItems - 1;
      } else {
        this.currentIndex -= 1;
      }
      this.forceDir = 'prev';
    },
    addTouchEvents() {
      const hammertime = new Hammer(this.$el);
      let recognized = false;
      hammertime.on('panleft', () => {
        if (!recognized) {
          recognized = true;
          this.next();
        }
      });
      hammertime.on('panright', () => {
        if (!recognized) {
          recognized = true;
          this.prev();
        }
      });
      hammertime.on('panend', () => {
        recognized = false;
      });
    },
    calculateMaxItems() {
      this.maxItems = this.$refs.list.querySelectorAll('.slider-item').length;
    },
    calculateHeight() {
      this.listHeight = this.$refs.list.querySelector('.slider-item.active').offsetHeight;
    },
    switchItem() {
      const oldSlide = this.$refs.list.querySelector('.slider-item.active');
      const newSlide = this.$refs.list.querySelectorAll('.slider-item')[this.currentIndex];
      const oldIndex = () => {
        let index = 0;
        [].forEach.call(this.$refs.list.querySelectorAll('.slider-item'), (slide, key) => {
          if (slide.classList.contains('active')) {
            index = key;
          }
        });
        return index;
      };
      let dir = this.currentIndex < oldIndex() ? 'prev' : 'next';
      if (this.forceDir) {
        dir = this.forceDir;
        this.forceDir = null;
      }
      // hide old slide
      if (oldSlide) {
        oldSlide.classList.remove('active');
        this.disappearSlide(oldSlide, dir);
      }
      // show new slide
      newSlide.classList.add('active');
      this.appearSlide(newSlide, dir);

      // same for dots
      [].forEach.call(this.$refs.list.querySelectorAll('.dots span'), item => item.classList.remove('active'));
      this.$refs.list.querySelectorAll('.dots span')[this.currentIndex].classList.add('active');

      // calculate new height
      this.calculateHeight();
    },
    appearSlide(slideElement, dir) {
      slideElement.classList.add(`appear-${dir}`);
      setTimeout(() => slideElement.classList.remove(`appear-${dir}`), 500);
    },
    disappearSlide(slideElement, dir) {
      slideElement.classList.add(`disappear-${dir}`);
      setTimeout(() => slideElement.classList.remove(`disappear-${dir}`), 500);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.slider-container {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  > div {
    transition: height 500ms ease;
  }
  .dots {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: block;
      background: $color;
      width: 14px;
      height: 14px;
      margin: 0 2px;
      border-radius: 50%;
      opacity: 0.5;
      transition: opacity 500ms ease;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
