<template>
    <div class="consumption-history">
        history
    </div>
</template>

<script>
import APIService from '../services/APIService';
import ConsumptionHistoryState from '../states/ConsumptionHistoryState';

export default {
  name: 'ConsumptionHistory',
  components: {
  },
  data() {
    return {
      advices: ConsumptionHistoryState.state,
    };
  },
  mounted() {
    APIService.consumptionHistory();
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
@import "../assets/scss/animations";

</style>
