<template>
  <div class="theme--buzzn">
    <header-bar @menu="$emit('menu')">{{ 'ourBUZZN' | translate }}</header-bar>
    <main>
      <section class="section--nightsky">
        <div class="wrap" v-if="socket.group_consumption">
          <bubble-chart></bubble-chart>
          <p><strong>{{ 'self-sufficiency-of-group' | translate }}</strong></p>
          <great-number unit="%">{{ Math.round(socket.group_production/socket.group_consumption * 100) }}</great-number>
          <p>
            {{ 'current-production-group' | translate(new Intl.NumberFormat('de-DE').format((socket.group_production/1000/1000).toFixed(2))) }}<br>
            {{ 'current-consumption-group' | translate(new Intl.NumberFormat('de-DE').format((socket.group_consumption/1000/1000).toFixed(2))) }}
          </p>
        </div>
        <div v-if="!socket.group_consumption" class="section-loader">
          <loading-icon :white="true"></loading-icon>
        </div>
      </section>
      <!-- section class="section--coal">
        <div class="wrap">
          <h3>{{ 'hitlist-headline' | translate }}</h3>
          <hit-list></hit-list>
        </div>
      </section -->
      <!-- section class="section--lavendel">
        <div class="wrap">
          <h3>{{ 'consumption-headline' | translate }}</h3>
          <consumption-history type="our"></consumption-history>
        </div>
      </section -->
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
import SocketState from '../states/SocketState';
import LoadingIcon from '../components/LoadingIcon';

export default {
  name: 'OurBuzzn',
  components: {
    HeaderBar,
    BubbleChart,
    GreatNumber,
    HitList,
    ConsumptionHistory,
    ConsumptionList,
    LoadingIcon,
  },
  data() {
    return {
      profile: ProfileState.state,
      socket: SocketState.state,
    };
  },
  created() {
    if (this.socket.status === 'idle') {
      WebSocketService.connect(this.profile.meterId);
    }
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
  .section-loader {
    min-height: 70vh;
  }
</style>
