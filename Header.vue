<template>
  <div class="headr">
      <span class="header-text">{{ tittle }}</span>
  </div>

</template>

<script setup>
  defineProps(["tittle"]);
</script>

<style scoped>
  .headr{
    background-image: url('../assets/img/Comp 1.gif');
    background-repeat:no-repeat;
    background-size:100%;


    text-align: center;
    width: 1920px;
    height: 60px;
  }
  .header-text{
    font-family:'SimHei';
    font-weight: bold;
    font-size: 38px;
    line-height: 60px;
    
    background: linear-gradient(92deg,#0072ff 0%,#00eaff 48.8525390625%,#01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>