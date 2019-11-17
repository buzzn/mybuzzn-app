<template>
  <div class="theme--meta">
    <header-bar @menu="$emit('menu')" :backButton="true">{{ $route.params.slug | translate }}</header-bar>
    <main>
      <component :is="$route.params.slug"></component>
    </main>
    <version-bar></version-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import VersionBar from '@/components/VersionBar';
import Support from '@/pages/meta/Support';
import Imprint from '@/pages/meta/Imprint';
import Terms from '@/pages/meta/Terms';
import PrivacyPolicy from '@/pages/meta/PrivacyPolicy';
import PasswordReset from '@/pages/meta/PasswordReset';
import About from '@/pages/meta/About';

export default {
  name: 'Meta',
  components: {
    HeaderBar,
    VersionBar,
    Support,
    Imprint,
    Terms,
    PrivacyPolicy,
    PasswordReset,
    About,
  },
};
</script>

<style scoped>

</style>
