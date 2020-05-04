<template>
  <div class="wrap stretch">
    <div v-if="!complete">
      <h2>{{ 'password-reset-headline' | translate }}</h2>
      <p>
          {{ 'password-reset-content' | translate }}
      </p>
    </div>
    <div v-if="!complete" >
      <field :error="errorMessage.email | translate" v-model="email" @blur="validate('email')" :label="'email' | translate" type="email" name="email"></field>
    </div>
    <div v-if="!complete" >
      <field-button :disabled="!this.validator.email" @click="resetPassword" :label="'password-reset' | translate"></field-button>
      <field-button :secondary="true" @click="$router.go(-1)" :label="'cancel' | translate"></field-button>
    </div>
    <div v-if="complete" >
      <h2>{{ 'password-reset-headline' | translate }}</h2>
      <p>
          {{ 'password-reset-successfull' | translate }}
      </p>
    </div>
    <div v-if="complete">
      <field-button @click="$router.push('/login')" :label="'back' | translate"></field-button>
    </div>
  </div>
</template>

<script>
import Field from '@/components/Field';
import FieldButton from '@/components/FieldButton';
import APIService from '../../services/APIService';

export default {
  name: 'PasswordReset',
  components: {
    Field,
    FieldButton,
  },
  watch: {
    email(value) {
      // eslint-disable-next-line
      this.validator.email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    },
  },
  data() {
    return {
      errorMessage: {
        email: '',
      },
      email: '',
      validator: {
        email: false,
      },
    };
  },
  methods: {
    resetPassword() {
      // TODO: Whenever the API is ready do something
      APIService.updatePassword({
        email: this.email,
      }).then(() => {
        this.complete = true;
      }).catch(() => this.$router.push('/error/400'));
    },
    validate(key) {
      switch (key) {
        case 'email':
          this.errorMessage.email = this.email.length && !this.validator.email ? 'not-valid-email' : '';
          break;
        default:
          break;
      }
    },
  },
};
</script>
