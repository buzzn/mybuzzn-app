// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import i18n from './i18n/de.json';

Vue.config.productionTip = false;

Vue.filter('translate', (value) => {
  if (i18n[value]) {
    return i18n[value];
  }
  return value;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    i18n,
  },
  router,
  components: { App },
  template: '<App/>',
});
