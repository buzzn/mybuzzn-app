<template>
  <div class="theme--buzzn">
    <header-bar @menu="$emit('menu')">{{ 'myBUZZN' | translate }}</header-bar>
    <main>
      <section class="section--grass">
        <div class="wrap">
          <div class="mood">
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="110" cy="110" r="68" fill="#c0d66b"></circle>
              <circle cx="138" cy="138" r="48" fill="#98b96e"></circle>
              <circle cx="72" cy="72" r="40" fill="#98b96e"></circle>
              <circle cx="66" cy="135" r="20" fill="#98b96e"></circle>
              <circle cx="120" cy="50" r="10" fill="#98b96e"></circle>
              <circle cx="127" cy="75" r="14" fill="#98b96e"></circle>
              <circle cx="38" cy="115" r="12" fill="#98b96e"></circle>
              <circle cx="88" cy="115" r="5" fill="#98b96e"></circle>
            </svg>
          </div>
          <div class="avatar image">
            <div class="mask" v-if="profile.avatar" :style="{backgroundImage: `url(${profile.avatar})`}"></div>
            <div class="mask" v-if="!profile.avatar">
              <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>icon_default_avatar</title><path d="M19,22.4h-.72V21.13a3.4,3.4,0,0,0,0-.45,6.82,6.82,0,0,0,3.6-5.82,3.39,3.39,0,0,0,1.95-3.07v-.73a1.83,1.83,0,0,0-1.83-1.83h-.11V8a5,5,0,0,0-5-5H13.23a5,5,0,0,0-5,5V9.23H8.08a1.83,1.83,0,0,0-1.83,1.83v.73A3.39,3.39,0,0,0,8.2,14.86a6.8,6.8,0,0,0,3.6,5.82,3.42,3.42,0,0,0,0,.45V22.4h-.71A7.61,7.61,0,0,0,3.45,30h1a6.61,6.61,0,0,1,6.6-6.6h.77a3.22,3.22,0,0,0,6.36,0H19a6.61,6.61,0,0,1,6.6,6.6h1A7.61,7.61,0,0,0,19,22.4Zm3-12.17a.83.83,0,0,1,.83.83v.73a2.42,2.42,0,0,1-.94,1.91V10.23ZM7.25,11.79v-.73a.83.83,0,0,1,.83-.83h.11V13.7A2.42,2.42,0,0,1,7.25,11.79Zm1.94,2.88V8a4,4,0,0,1,4-4h3.54a4,4,0,0,1,4,4v6.69a5.81,5.81,0,0,1-11.62,0Zm8,8.19a2.24,2.24,0,0,1-4.47,0V21.1a6.73,6.73,0,0,0,4.46,0v1.76Z"/></svg>
            </div>
          </div>
          <p class="labels">
            <strong>{{ 'hello-name' | translate(profile.firstname + ' ' + profile.lastname) }}</strong><br>
            {{ 'current-consumption' | translate }}
          </p>
          <great-number class="number" unit="Watt">1.432</great-number>
        </div>
      </section>
      <section class="section--coal">
        <div class="wrap">
          <h3>{{ 'devices-headline' | translate }}</h3>
          <device-list></device-list>
        </div>
      </section>
      <section class="section--gold">
        <div class="wrap">
          <h3>{{ 'hints-headline' | translate }}</h3>
          <advices></advices>
        </div>
      </section>
      <section class="section--snow">
        <div class="wrap">
          <challenges></challenges>
        </div>
      </section>
      <section class="section--lavendel">
        <div class="wrap">
          <h3>{{ 'consumption-headline' | translate }}</h3>
          <consumption-history></consumption-history>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import GreatNumber from '@/components/GreatNumber';
import DeviceList from '@/components/DeviceList';
import Advices from '@/components/Advices';
import Challenges from '@/components/Challenges';
import ConsumptionHistory from '@/components/ConsumptionHistory';
import ProfileState from '../states/ProfileState';


export default {
  name: 'MyBuzzn',
  components: {
    HeaderBar,
    GreatNumber,
    DeviceList,
    Advices,
    Challenges,
    ConsumptionHistory,
  },
  mounted() {
    // TODO: make it real
    setTimeout(() => {
      this.$root.appLoading = false;
    }, 2000);
  },
  data() {
    return {
      profile: ProfileState.state,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/animations';

p {
  text-align: center;
  strong {
    font-size: 21px;
    line-height: 30px;
  }
}

.mood {
  position: absolute;
  top: 100px;
  right: 50%;
  transform: translate(20%);
  svg {
    circle {
      transform-origin: center center;
      opacity: 0;
      animation: fadeScale 700ms ease forwards;
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 100ms;
        }
      }
    }
  }
}

.avatar {
  opacity: 0;
  padding: 40px 0 20px;
  animation: fadeScale 700ms ease 1000ms forwards;
  &.image {
    height: 82px;
    width: 82px;
    margin: 0 auto 2em;
    position: relative;
    .mask {
      border-radius: 50%;
      overflow: hidden;
      border: 8px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5);
      background-size: cover;
      background-position: center center;
      width: 100%;
      height: 100%;
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
}

.labels {
  opacity: 0;
  animation: fadeUp 800ms ease 1100ms forwards;
}

.number {
  opacity: 0;
  animation: fadeUp 800ms ease 1150ms forwards;
}
</style>
