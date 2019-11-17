<template>
  <div class="theme--buzzn">
    <header-bar @menu="$emit('menu')">{{ 'myBUZZN' | translate }}</header-bar>
    <main>
    </main>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';

export default {
  name: 'MyBuzzn',
  components: {
    HeaderBar,
  },
};
</script>

<style scoped>

</style>
