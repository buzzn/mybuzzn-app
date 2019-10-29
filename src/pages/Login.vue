<template>
  <div class="theme--login">
    <header-bar @menu="$emit('menu')">{{ 'login' | translate }}</header-bar>
    <logo></logo>
    <panel :title="'welcome' | translate">
      <p>{{ 'login-intro' | translate }}</p>
      <field :label="'email' | translate" type="email" name="email"></field>
      <field :label="'password' | translate" type="password" name="password"></field>
      <field-button :label="'login' | translate"></field-button>
    </panel>

    <div class="hints wrap">
      <p>
        {{ 'has-no-account' | translate }} <router-link :to="{ name: 'Register' }">{{ 'help' | translate }}</router-link>
      </p>
      <p>
        {{ 'demo-text' | translate }} <router-link :to="{ name: 'Login' }">{{ 'demo-modus' | translate }}</router-link>
      </p>
    </div>
    <version-bar></version-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Logo from '@/components/Logo';
import Panel from '@/components/Panel';
import Field from '@/components/Field';
import FieldButton from '@/components/FieldButton';
import VersionBar from '@/components/VersionBar';

export default {
  name: 'Login',
  components: {
    HeaderBar,
    Logo,
    Panel,
    Field,
    FieldButton,
    VersionBar,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
@import '../assets/scss/animations';

.hints {
  opacity: 0;
  animation: fadeUp 1000ms ease 300ms forwards;
  p {
    text-align: center;
    font-size: 12px;
    a {
      text-decoration: none;
      font-weight: bold;
      color: $color;
    }
  }
}
</style>
