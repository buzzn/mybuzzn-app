<template>
    <div class="field">
        <label :for="name">{{ label }}</label>
        <input :disabled="disabled" ref="input" @input="update" :value="value" :id="name" :name="name" :type="type || 'text'" :placeholder="label" />
    </div>
</template>

<script>
export default {
  name: 'Field',
  props: ['label', 'type', 'name', 'value', 'disabled'],
  methods: {
    update() {
      this.$emit('input', this.$refs.input.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  label {
    font-size: 12px;
    color: $grey-3;
    display: inline-block;
    padding: 2px 5px;
  }
  input {
    background: $white;
    box-shadow: none;
    outline: none;
    padding: 0 15px;
    line-height: 40px;
    border: 1px solid $grey-3;
    border-radius: 3px;
    width: 100%;
    box-sizing: border-box;
    &:disabled {
      background: transparent;
      border: none;
      line-height: 30px
    }
  }
}
</style>
