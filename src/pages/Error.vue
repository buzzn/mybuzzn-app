<template>
  <div class="theme--meta">
    <header-bar @menu="$emit('menu')" :backButton="true">{{ $route.params.slug | translate }}</header-bar>
    <main>
      <div class="wrap stretch">
        <div>
          <h3 class="error-headline">{{ 'error-headline-' + $route.params.number | translate }}</h3>
          <error-icon :message="'error-' + $route.params.number | translate "></error-icon>
        </div>
        <field-button @click="$router.go(-1)" :label="'try-again' | translate"></field-button>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import ErrorIcon from '@/components/ErrorIcon';
import FieldButton from '@/components/FieldButton';

export default {
  name: 'Meta',
  components: {
    HeaderBar,
    ErrorIcon,
    FieldButton,
  },
};
</script>

<style lang="scss" scoped>
h3.error-headline {
  font-size: 55px;
  margin-bottom: 0;
}
</style>
