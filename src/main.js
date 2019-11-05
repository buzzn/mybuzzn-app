// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import i18n from './i18n/de.json';

const startApp = () => {
  Vue.config.productionTip = false;

  Vue.filter('translate', (value, replace) => {
    if (i18n[value]) {
      const val = i18n[value];
      if (replace) {
        return val.replace(/%s/g, replace);
      }
      return val;
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
};
if (window.cordova) {
  document.addEventListener('deviceready', startApp);
} else {
  startApp();
}
