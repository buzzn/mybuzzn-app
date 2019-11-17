<template>
  <div class="wrap">
    <h2>{{ 'about-headline' | translate }}</h2>
    <p>
        {{ 'installed-version' | translate(version) }}
    </p>
    <h4>{{ 'licenses-headline' | translate }}</h4>
    <p>{{ 'licenses-content' | translate }}</p>
    <ul class="list">
      <li v-for="(library, key) in libraries" :key="key" @click="library.showLicense = !library.showLicense">
        <strong>{{ library.name }}</strong> ({{library.version}}) <br> <small>by {{ library.author }}</small> <br>
        <div v-show="library.showLicense">
          <div class="license" v-if="library.licenseContent" v-html="nl2br(library.licenseContent)"></div>
          <div class="license" v-if="!library.licenseContent && library.license" v-html="nl2br(library.license)"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Dependencies from '../../../dependencies.json';
import PackageJSON from '../../../package.json';

export default {
  name: 'About',
  data() {
    return {
      version: PackageJSON.version,
      libraries: Dependencies,
    };
  },
  mounted() {
    this.libraries = this.libraries.map(library => ({ ...library, showLicense: false }));
  },
  methods: {
    nl2br(str) {
      return str.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '<br><br>');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  .license {
    padding: 20px;
    font-size: 12px;
    line-height: 1em;
    background: $grey-2;
    overflow: hidden;
    margin: 1em 0 2em;
  }
  .list {
    li {
      margin-bottom: 1em;
    }
  }
</style>
