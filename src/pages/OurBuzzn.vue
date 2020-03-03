<template>
  <div class="theme--buzzn">
    <header-bar @menu="$emit('menu')">{{ 'ourBUZZN' | translate }}</header-bar>
    <main>
      <section class="section--nightsky">
        <div class="wrap">
          <bubble-chart></bubble-chart>
          <p><strong>{{ 'self-sufficiency-of-group' | translate }}</strong></p>
          <great-number unit="%">42</great-number>
          <p>
            {{ 'current-production-group' | translate('7,24') }}<br>
            {{ 'current-consumption-group' | translate('17,23') }}
          </p>
        </div>
      </section>
      <section class="section--coal">
        <div class="wrap">
          <h3>{{ 'hitlist-headline' | translate }}</h3>
          <hit-list></hit-list>
        </div>
      </section>
      <section class="section--lavendel">
        <div class="wrap">
          <h3>{{ 'consumption-headline' | translate }}</h3>
          <consumption-history type="our"></consumption-history>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import BubbleChart from '@/components/BubbleChart';
import GreatNumber from '@/components/GreatNumber';
import HitList from '@/components/HitList';
import ConsumptionHistory from '@/components/ConsumptionHistory';
import ConsumptionList from '@/components/ConsumptionList';
import WebSocketService from '../services/WebSocketService';
import ProfileState from '../states/ProfileState';

export default {
  name: 'OurBuzzn',
  components: {
    HeaderBar,
    BubbleChart,
    GreatNumber,
    HitList,
    ConsumptionHistory,
    ConsumptionList,
  },
  data() {
    return {
      profile: ProfileState.state,
    };
  },
  mounted() {
    WebSocketService.connect(this.profile.meterId);
  },
};
</script>

<style lang="scss" scoped>
  p {
    text-align: center;
    strong {
      font-size: 21px;
      line-height: 30px;
    }
  }
</style>
