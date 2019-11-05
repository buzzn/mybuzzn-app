<template>
  <div class="theme--buzzn">
    <header-bar @menu="$emit('menu')">{{ 'ourBUZZN' | translate }}</header-bar>
    <main>
      <section>
        <bubble-chart></bubble-chart>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import BubbleChart from '@/components/BubbleChart';

export default {
  name: 'OurBuzzn',
  components: {
    HeaderBar,
    BubbleChart,
  },
};
</script>

<style scoped>

</style>
