<template>
  <div class="theme--login">
    <header-bar @menu="$emit('menu')">{{ 'login' | translate }}</header-bar>
    <main>
      <logo></logo>
      <panel :title="'welcome' | translate">
        <p>{{ 'login-intro' | translate }}</p>
        <field :error="errorMessage.email | translate" @blur="validate('email')" v-model="email" :label="'email' | translate" type="email" name="email"></field>
        <field :error="errorMessage.password | translate" v-model="password" @blur="validate('password')" :label="'password' | translate" type="password" name="password"></field>
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
import AppState from '../states/AppState';
import { errorHandling } from '../services/ErrorService';

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
      this.validator.password = value.length; // value.length >= 8;
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
  mounted() {
    // TODO: make it real
    AppState.set('loading', false);
  },
  methods: {
    signIn(demo = false) {
      AuthState.set('demo', demo);
      AppState.set('loading', true);
      APIService.auth({
        user: this.email,
        password: this.password,
      })
        .then(() =>
          APIService.profile()
            .then(() => {
              this.$router.push({ name: 'MyBuzzn' });
              setTimeout(() => AppState.set('loading', false), 100);
            })
            .catch(error => errorHandling(error.response.status, this.$router)),
        )
        .catch((error) => {
          if (error && error.response && error.response.status === 401) {
            // validation fails
            this.errorMessage.email = 'unauthorized-email';
            this.errorMessage.password = 'unauthorized-password';
          } else {
            if (error && error.response && error.response.status) {
              errorHandling(error.response.status, this.$router);
            }
            // eslint-disable-next-line
            console.error(error);
          }
        });
    },
    validate(key) {
      switch (key) {
        case 'email':
          this.errorMessage.email = this.email.length && !this.validator.email ? 'not-valid-email' : '';
          break;
        case 'password':
          this.errorMessage.password = this.password.length && !this.validator.password ? 'not-valid-password' : '';
          break;
        default:
          break;
      }
    },
    handleDemoMode() {
      this.email = 'demo@buzzn.net';
      this.password = '';
      this.signIn(true);
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
