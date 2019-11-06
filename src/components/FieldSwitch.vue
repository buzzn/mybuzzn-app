<template>
    <div class="field">
        <input ref="input" :value="value" @input="update" type="checkbox" :id="name">
        <label :for="name">
          <slot></slot>
        </label>
    </div>
</template>

<script>
export default {
  name: 'FieldSwitch',
  props: ['name', 'value'],
  methods: {
    update() {
      this.$emit('input', this.$refs.input.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.field {
  margin: 0 0 20px;
  input {
    position: absolute;
    left: -9999em;
    opacity: 0;
    &:checked + label {
      &:before {
        background-color: $solar-3;
      }
      &:after {
        right: 2px;
      }
    }
  }
  label {
    display: inline-block;
    padding-right: 60px;
    position: relative;
    cursor: pointer;
    &:before {
      content: '';
      display: block;
      width: 50px;
      height: 30px;
      background-color: $grey-2;
      border-radius: 15px;
      position: absolute;
      top: 0;
      right: 0;
      transition: background-color 300ms ease;
    }
    &:after {
      content: '';
      display: block;
      width: 26px;
      height: 26px;
      position: absolute;
      right: 22px;
      top: 2px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: right 300ms ease;
    }
    a {
      color: $solar-3;
      text-decoration: none;
      font-weight: bold;
    }
  }
}
</style>
