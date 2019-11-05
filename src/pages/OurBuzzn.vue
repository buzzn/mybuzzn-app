<template>
  <div class="theme--buzzn">
    <header-bar @menu="$emit('menu')">{{ 'ourBUZZN' | translate }}</header-bar>
    <main>
      <section class="section--nightsky">
        <div class="wrap">
          <bubble-chart></bubble-chart>
          <great-number unit="%">42</great-number>
          <p>
            <strong>{{ 'self-sufficiency-of-group' | translate }}</strong><br>
            {{ 'current-consumption' | translate(123456789) }}
          </p>
        </div>
      </section>
      <section class="section--coal">
        <div class="wrap">
          <h3>{{ 'hitlist-headline' | translate }}</h3>
          <p class="gf">{{ 'current-position' | translate(12) }}</p>
          <hit-list></hit-list>
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

export default {
  name: 'OurBuzzn',
  components: {
    HeaderBar,
    BubbleChart,
    GreatNumber,
    HitList,
  },
};
</script>

<style lang="scss" scoped>
  p {
    text-align: center;
    strong {
      font-size: 21px;
    }
  }
</style>
