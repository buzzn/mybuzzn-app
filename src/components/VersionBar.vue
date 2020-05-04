<template>
    <footer>
        <span class="version">{{ version }}</span>
    </footer>
</template>

<script>
import PackageJSON from '../../package.json';

export default {
  name: 'VersionBar',
  data: () => ({
    version: PackageJSON.version,
  }),
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

footer {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px;
    opacity: 0.75;
    span.version {
        font-size: 11px;
    }
}

</style>
