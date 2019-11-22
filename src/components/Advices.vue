<template>
    <div class="advices">
        <slider-container v-if="advices.data.length">
          <slider-item v-for="(advice, key) in advices.data.slice(0, 3)" :key="key">
            <div class="item">
              <h3>{{ advice.headline }}</h3>
              <div class="image">
                <div v-html="advice.icon"></div>
              </div>
              <p>{{ advice.description }}</p>
            </div>
          </slider-item>
        </slider-container>
    </div>
</template>

<script>
import SliderContainer from '@/components/SliderContainer';
import SliderItem from '@/components/SliderItem';
import APIService from '../services/APIService';
import AdvicesState from '../states/AdvicesState';

export default {
  name: 'Advices',
  components: {
    SliderContainer,
    SliderItem,
  },
  data() {
    return {
      advices: AdvicesState.state,
    };
  },
  mounted() {
    APIService.advices();
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.advices {
  .item {
    padding: 20px 0;
    text-align: center;
    h3 {
      font-size: 35px;
    }
    svg {
      max-width: 120px;
      max-height: 120px;
      margin: 1.5em auto;
      display: block;
    }
  }
}
</style>
