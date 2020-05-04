<template>
    <div class="field">
        <button :class="{ secondary }" :disabled="disabled" @click.prevent="$emit('click')" :type="type || 'button'">
          {{ label }}
        </button>
    </div>
</template>

<script>
export default {
  name: 'FieldButton',
  props: ['label', 'type', 'disabled', 'secondary'],
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.field {
  margin: 0 10px 10px;
  button {
    background: $solar-3;
    outline: none;
    height: 40px;
    border-radius: 20px;
    width: 100%;
    border: none;
    &:active {
      background: $heat;
    }
    &:disabled {
      background: $grey-2;
    }
    &.secondary {
      background: $grey-3;
      color: white;
    }
  }
}
</style>
