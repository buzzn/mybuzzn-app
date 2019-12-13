<template>
    <div class="devicelist">
        <ul>
          <li v-for="(device, key) in devicelist.data.slice(0, 3)" :key="key">
            <div class="item">
              <div class="image">
                <div v-html="device.icon"></div>
              </div>
              <div class="name">
                <span class="name-right">{{ device.name }} <br> <small>ca. {{ new Intl.NumberFormat('de-DE').format(device.level/1000) }} kWh</small></span>
              </div>
            </div>
          </li>
        </ul>
    </div>
</template>

<script>
import APIService from '../services/APIService';
import DevicelistState from '../states/DevicelistState';

export default {
  name: 'DeviceList',
  data() {
    return {
      devicelist: DevicelistState.state,
    };
  },
  mounted() {
    APIService.devicelist();
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.devicelist {
  margin: 2em 0;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      margin: 0;
      padding: 0;
      &:last-of-type {
        .item {
          &:after {
            display: none;
          }
        }
      }
    }
  }
  .item {
    display: flex;
    padding: 15px 0;
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
      svg {
        display: block;
        width: 100%;
        height: 100%;
        width: 50px;
        height: 50px;
        * {
          fill: white !important;
          stroke: none;
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
        letter-spacing: 0.05em;
        small {
          font-weight: 300;
        }
      }
    }
  }
}
</style>
