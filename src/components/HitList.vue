<template>
    <div class="hitlist">
        <ul>
          <li v-for="(consumer, key) in hitlist.data" :key="key">
            <div class="item">
              <div class="image" :style="{ backgroundImage: `url(${consumer.avatar})`}"></div>
              <div class="name">
                <span class="position">{{ consumer.position }}.</span>
                <span class="name-right">{{ consumer.name }} <br> <small>{{ consumer.value }} P</small></span>
              </div>
            </div>
          </li>
        </ul>
    </div>
</template>

<script>
import APIService from '../services/APIService';
import HitlistState from '../states/HitlistState';

export default {
  name: 'Hitlist',
  data() {
    return {
      hitlist: HitlistState.state,
    };
  },
  mounted() {
    APIService.hitlist();
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.hitlist {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      margin: 0;
      padding: 0;
    }
  }
  .item {
    display: flex;
    padding: 20px 0;
    position: relative;
    &:after {
      content: '';
      display: block;
      width: 105%;
      position: absolute;
      bottom: 0;
      height: 1px;
      background: $grey-3;
      right: -40px;
      opacity: 0.3;
    }

    .image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5);
      background-size: cover;
      background-position: center center;
    }
    .name {
      display: flex;
      padding-left: 20px;
      padding-top: 10px;
      .name-right {
        font-weight: 500;
        display: block;
        padding-left: 10px;
      }
    }
  }
}
</style>
