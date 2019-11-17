<template>
  <div class="theme--login">
    <header-bar @menu="$emit('menu')">{{ 'login' | translate }}</header-bar>
    <main>
      <logo></logo>
      <panel :title="'welcome' | translate">
        <p>{{ 'login-intro' | translate }}</p>
        <field :error="errorMessage.email" @blur="validate('email')" v-model="email" :label="'email' | translate" type="email" name="email"></field>
        <field :error="errorMessage.password" v-model="password" @blur="validate('password')" :label="'password' | translate" type="password" name="password"></field>
        <field-button :disabled="!this.validator.email || !this.validator.password" @click="signIn" :label="'login' | translate"></field-button>
      </panel>
      <div class="hints wrap">
        <p>
          {{ 'password-reset-headline' | translate }} <router-link :to="{ path: '/meta/password-reset' }">{{ 'password-reset' | translate }}</router-link>
        </p>
        <p>
          {{ 'has-no-account' | translate }} <router-link :to="{ name: 'Register' }">{{ 'help' | translate }}</router-link>
        </p>
        <p>
          {{ 'demo-text' | translate }} <strong @click="handleDemoMode">{{ 'demo-modus' | translate }}</strong>
        </p>
      </div>
      <version-bar></version-bar>
    </main>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar';
import Logo from '@/components/Logo';
import Panel from '@/components/Panel';
import Field from '@/components/Field';
import FieldButton from '@/components/FieldButton';
import VersionBar from '@/components/VersionBar';
import APIService from '../services/APIService';
import AuthState from '../states/AuthState';

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
  watch: {
    email(value) {
      // eslint-disable-next-line
      this.validator.email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    },
    password(value) {
      this.validator.password = value.length >= 8;
    },
  },
  data: () => ({
    errorMessage: {
      email: '',
      password: '',
    },
    validator: {
      email: false,
      password: false,
    },
    email: '',
    password: '',
  }),
  methods: {
    signIn() {
      AuthState.set('demo', false);
      APIService.auth({
        email: this.email,
        password: this.password,
      }).then(() =>
        APIService.profile().then(() =>
          this.$router.push({ name: 'MyBuzzn' })));
    },
    validate(key) {
      switch (key) {
        case 'email':
          this.errorMessage.email = this.email.length && !this.validator.email ? 'not valid' : '';
          break;
        case 'password':
          this.errorMessage.password = this.password.length && !this.validator.password ? 'not valid' : '';
          break;
        default:
          break;
      }
    },
    handleDemoMode() {
      AuthState.set('demo', true);
      APIService.auth().then(() =>
        APIService.profile().then(() =>
          this.$router.push({ name: 'MyBuzzn' })));
    },
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
    margin: 0;
    padding: 0 0 1em;
    a {
      text-decoration: none;
      font-weight: bold;
      color: $color;
    }
  }
}
</style>
