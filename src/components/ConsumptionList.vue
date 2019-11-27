<template>
    <div class="consumption-list">
        <div class="row" v-for="(item, key) in items" :key="key">
          <label>{{ key | translate}}</label>
          <strong>{{ new Intl.NumberFormat('de-DE').format(item/1000) }} kWh</strong>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ConsumptionList',
  props: ['data'],
  computed: {
    items() {
      return Object.values(this.data)[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/animations";
.consumption-list {
  margin: 2em 0;
  .row {
    justify-content: space-between;
    margin: 0 0 0.5em;
    > * {
      flex: none;
    }
    label {
      position: relative;
    }
  }
}

</style>
