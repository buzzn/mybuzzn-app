<template>
    <div class="hitlist">
        <p class="gf">{{ 'current-position' | translate(myPosition) }}</p>
        <ul>
          <li v-for="(consumer, key) in hitlist.data.slice(0,5)" :key="key">
            <div class="item" :class="{ highlight: myPosition === consumer.position }">
              <div class="image" :style="{ backgroundImage: `url(${consumer.avatar})`}">
                <div class="mask" v-if="consumer.avatar" :style="{backgroundImage: `url(${consumer.avatar})`}"></div>
                <div class="mask" v-if="!consumer.avatar">
                  <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_default_avatar</title><path d="M19,22.4h-.72V21.13a3.4,3.4,0,0,0,0-.45,6.82,6.82,0,0,0,3.6-5.82,3.39,3.39,0,0,0,1.95-3.07v-.73a1.83,1.83,0,0,0-1.83-1.83h-.11V8a5,5,0,0,0-5-5H13.23a5,5,0,0,0-5,5V9.23H8.08a1.83,1.83,0,0,0-1.83,1.83v.73A3.39,3.39,0,0,0,8.2,14.86a6.8,6.8,0,0,0,3.6,5.82,3.42,3.42,0,0,0,0,.45V22.4h-.71A7.61,7.61,0,0,0,3.45,30h1a6.61,6.61,0,0,1,6.6-6.6h.77a3.22,3.22,0,0,0,6.36,0H19a6.61,6.61,0,0,1,6.6,6.6h1A7.61,7.61,0,0,0,19,22.4Zm3-12.17a.83.83,0,0,1,.83.83v.73a2.42,2.42,0,0,1-.94,1.91V10.23ZM7.25,11.79v-.73a.83.83,0,0,1,.83-.83h.11V13.7A2.42,2.42,0,0,1,7.25,11.79Zm1.94,2.88V8a4,4,0,0,1,4-4h3.54a4,4,0,0,1,4,4v6.69a5.81,5.81,0,0,1-11.62,0Zm8,8.19a2.24,2.24,0,0,1-4.47,0V21.1a6.73,6.73,0,0,0,4.46,0v1.76Z"/></svg>
                </div>
              </div>
              <div class="name">
                <span class="position">{{ consumer.position }}.</span>
                <span class="name-right">{{ consumer.name }} <br> <small>{{ consumer.value }} kWh</small></span>
              </div>
            </div>
          </li>
        </ul>

        <div v-if="hasDivider" class="divider">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul v-if="hasOutrange">
          <li v-for="(consumer, key) in outrange" :key="key">
            <div class="item" :class="{ highlight: myPosition === consumer.position }">
              <div class="image" :style="{ backgroundImage: `url(${consumer.avatar})`}">
                <div class="mask" v-if="consumer.avatar" :style="{backgroundImage: `url(${consumer.avatar})`}"></div>
                <div class="mask" v-if="!consumer.avatar">
                  <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_default_avatar</title><path d="M19,22.4h-.72V21.13a3.4,3.4,0,0,0,0-.45,6.82,6.82,0,0,0,3.6-5.82,3.39,3.39,0,0,0,1.95-3.07v-.73a1.83,1.83,0,0,0-1.83-1.83h-.11V8a5,5,0,0,0-5-5H13.23a5,5,0,0,0-5,5V9.23H8.08a1.83,1.83,0,0,0-1.83,1.83v.73A3.39,3.39,0,0,0,8.2,14.86a6.8,6.8,0,0,0,3.6,5.82,3.42,3.42,0,0,0,0,.45V22.4h-.71A7.61,7.61,0,0,0,3.45,30h1a6.61,6.61,0,0,1,6.6-6.6h.77a3.22,3.22,0,0,0,6.36,0H19a6.61,6.61,0,0,1,6.6,6.6h1A7.61,7.61,0,0,0,19,22.4Zm3-12.17a.83.83,0,0,1,.83.83v.73a2.42,2.42,0,0,1-.94,1.91V10.23ZM7.25,11.79v-.73a.83.83,0,0,1,.83-.83h.11V13.7A2.42,2.42,0,0,1,7.25,11.79Zm1.94,2.88V8a4,4,0,0,1,4-4h3.54a4,4,0,0,1,4,4v6.69a5.81,5.81,0,0,1-11.62,0Zm8,8.19a2.24,2.24,0,0,1-4.47,0V21.1a6.73,6.73,0,0,0,4.46,0v1.76Z"/></svg>
                </div>
              </div>
              <div class="name">
                <span class="position">{{ consumer.position }}.</span>
                <span class="name-right">{{ consumer.name }} <br> <small>{{ consumer.value }} kWh</small></span>
              </div>
            </div>
          </li>
        </ul>
    </div>
</template>

<script>
import APIService from '../services/APIService';
import HitlistState from '../states/HitlistState';
import ProfileState from '../states/ProfileState';

export default {
  name: 'Hitlist',
  data() {
    return {
      myPosition: 0,
      hitlist: HitlistState.state,
    };
  },
  computed: {
    hasDivider() {
      return (this.myPosition > 7);
    },
    hasOutrange() {
      return (this.myPosition > 5);
    },
    outrange() {
      const result = [];
      const prev = this.hitlist.data.slice(5).filter(user => user.position === this.myPosition - 1);
      if (prev.length) {
        result.push(...prev);
      }

      const my = this.hitlist.data.slice(5).filter(user => user.position === this.myPosition);
      if (my.length) {
        result.push(...my);
      }

      const next = this.hitlist.data.slice(5).filter(user => user.position === this.myPosition + 1);
      if (next.length) {
        result.push(...next);
      }

      return result;
    },
  },
  mounted() {
    APIService.hitlist();
    const filteredList = this.hitlist.data.filter(user => user.id === ProfileState.get('id'));
    if (filteredList) {
      this.myPosition = filteredList[0].position;
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.hitlist {
  > p {
    text-align: center;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      margin: 0;
      padding: 0;
      &:last-of-type {
        .item{
          &:after {
            display: none !important;
          }
        }
      }
    }
  }
  .divider {
    span {
      width: 15px;
      height: 15px;
      margin: 10px 0 10px 20px;
      background: $grey-1;
      display: block;
      border-radius: 50%;
    }
  }

  .item {
    display: flex;
    padding: 12px 0;
    position: relative;

    &.highlight {
      color: $production;
    }

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
      .mask {
        background-image: linear-gradient(45deg, rgba(182,234,236,1) 0%, rgba(207,223,87,1) 100%);
        svg {
          width: 100%;
          height: 100%;
          display: block;
          path {
            fill: white;
          }
        }
      }
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
