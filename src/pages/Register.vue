<template>
  <div class="theme--login">
    <header-bar @menu="$emit('menu')">{{ 'register' | translate }}</header-bar>
    <main>
      <logo></logo>
      <panel :title="'welcome' | translate">
        <p>{{ 'enter-password' | translate }}</p>
        <field :error="errorMessage.password | translate" v-model="password" @blur="validate('password')" :label="'password' | translate" type="password" name="password"></field>
        <field :error="errorMessage.passwordRepeat | translate" v-model="passwordRepeat" @blur="validate('passwordRepeat')" :label="'repeat-password' | translate" type="password" name="repeat-password"></field>
        <field-switch v-model="termsAccepted" :name="'terms-accepted'">Ich habe die <router-link :to="{ path: '/meta/terms' }">Nutzungsbedingungen</router-link> gelesen und stimme zu</field-switch>
        <field-button @click="register" :disabled="!isValid" :label="'register' | translate"></field-button>
      </panel>
      <div class="hints wrap">
        <p>
          {{ 'has-already-an-account' | translate }} <router-link :to="{ name: 'Login' }">{{ 'login' | translate }}</router-link>
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
import FieldSwitch from '@/components/FieldSwitch';
import VersionBar from '@/components/VersionBar';
import APIService from '../services/APIService';
import AppState from '../states/AppState';

export default {
  name: 'Register',
  components: {
    HeaderBar,
    Logo,
    Panel,
    Field,
    FieldButton,
    FieldSwitch,
    VersionBar,
  },
  computed: {
    isValid() {
      return Object.values(this.validator).filter(v => !v).length === 0 && this.termsAccepted;
    },
  },
  watch: {
    password(value) {
      this.validator.password = value.length >= 8;
    },
    passwordRepeat(value) {
      this.validator.passwordRepeat = this.password === value;
    },
  },
  data: () => ({
    errorMessage: {
      password: '',
      passwordRepeat: '',
    },
    validator: {
      password: false,
      passwordRepeat: false,
    },
    password: '',
    passwordRepeat: '',
    termsAccepted: false,
  }),
  mounted() {
    // TODO: make it real
    setTimeout(() => {
      AppState.set('loading', false);
    }, 2000);
  },
  methods: {
    register() {
      APIService.register({
        email: this.$route.params.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
        termsAccepted: this.termsAccepted,
      }).then(() =>
        APIService.auth({
          email: this.$route.params.email,
          password: this.password,
        }).then(() =>
          APIService.profile().then(() =>
            this.$router.push({
              name: 'Profile',
              params: {
                firstView: true,
              },
            }))));
    },
    validate(key) {
      switch (key) {
        case 'password':
          this.errorMessage.password = this.password.length && !this.validator.password ? 'not-valid-password' : '';
          break;
        case 'passwordRepeat':
          this.errorMessage.passwordRepeat = this.passwordRepeat.length && !this.validator.passwordRepeat ? 'not-valid-repeat' : '';
          break;
        default:
          break;
      }
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
