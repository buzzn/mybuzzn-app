// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import i18n from './i18n/de.json';
import AppState from './states/AppState';

// custom URL Schema
let redirectTo = null;
window.handleOpenURL = (url) => {
  setTimeout(() => {
    const urlParts = new URL(url);
    const path = urlParts.pathname.replace('//', '');
    redirectTo = path;
    document.dispatchEvent(new CustomEvent('redirect', {
      detail: redirectTo,
    }));
  }, 0);
};

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
      app: AppState.state,
    },
    router,
    mounted() {
      if (redirectTo) {
        this.$router.push(redirectTo);
      }
      document.addEventListener('redirect', (event) => {
        this.$router.push(event.detail);
      });

      // check if app is offline
      if (navigator.connection) {
        AppState.set('offline', navigator.connection.type === 'none');
        document.addEventListener('online', () => {
          AppState.set('offline', false);
        });
        document.addEventListener('offline', () => {
          AppState.set('offline', true);
        });
      }
    },
    components: { App },
    template: `
    <div>
      <div class="offline-hint" :class="{ show: app.offline }">
        {{ 'no-internet' | translate }}
      </div>
      <App :loading="app.loading" :offline="app.offline" />
    </div>
    `,
  });
};
if (window.cordova) {
  document.addEventListener('deviceready', startApp);
} else {
  startApp();
}
