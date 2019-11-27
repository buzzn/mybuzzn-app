<template>
    <div class="field" :class="{ error: !!error }">
      <label :for="name">{{ label }}</label>
      <input :disabled="disabled" ref="input" @input="update" @blur="$emit('blur')" :value="value" :id="name" :name="name" :type="type || 'text'" :placeholder="label" />
      <small>{{ error }}</small>
    </div>
</template>

<script>
export default {
  name: 'Field',
  props: ['label', 'type', 'name', 'value', 'disabled', 'error'],
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
  position: relative;

  label {
    font-size: 12px;
    color: $grey-3;
    display: inline-block;
    padding: 2px 5px;
  }
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
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

  &.error {
    label {
      color: rgba($error, 0.7);
    }
    input {
      border: 1px solid $error;
      color: $error;
    }
    small {
      font-size: 11px;
      color: $error;
      padding: 2px 5px;
      display: inline-block;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
}
</style>
