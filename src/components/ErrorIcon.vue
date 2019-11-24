<template>
    <div class="error">
      <div class="icon">
        <svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>Assets</title><path d="M24,20.46,16.33,7.22a1.39,1.39,0,0,0-1.19-.68A1.36,1.36,0,0,0,14,7.22L6.33,20.46a1.38,1.38,0,0,0,0,1.39,1.34,1.34,0,0,0,1.18.68H22.77A1.34,1.34,0,0,0,24,21.85,1.38,1.38,0,0,0,24,20.46Zm-.86.89a.38.38,0,0,1-.32.18H7.51a.35.35,0,0,1-.31-.18.39.39,0,0,1,0-.39L14.82,7.72a.39.39,0,0,1,.32-.19.38.38,0,0,1,.32.19L23.09,21A.39.39,0,0,1,23.09,21.35Z"/><path d="M17.26,14.43a.5.5,0,0,0-.7,0l-1.43,1.43L13.7,14.43a.5.5,0,1,0-.71.71l1.43,1.43L13,18a.5.5,0,0,0,0,.7.5.5,0,0,0,.71,0l1.43-1.42,1.43,1.42a.49.49,0,1,0,.7-.7l-1.43-1.43,1.43-1.43A.5.5,0,0,0,17.26,14.43Z"/></svg>
      </div>
      {{ message }}
    </div>
</template>

<script>
export default {
  name: 'ErrorIcon',
  props: ['message'],
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/animations";

.error {
  text-align: center;
  .icon {
    background: white;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 120px;
      height: 120px;

      * {
        fill: $color;
      }
    }
  }
}

</style>
