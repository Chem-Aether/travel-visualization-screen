<template>
  <div class="Right">
    <SmallTittle  style="margin-bottom: 10px;">机票/车票统计</SmallTittle>
    <div class="RightTable" ref="Scroll" @wheel="JSScroll">
      <Ticket />
    </div>
    <div class="RightModel">
      <Model />
    </div>
  </div>
</template>

<script setup>
import Ticket from './Ticket.vue'
import Model from './Model.vue'
import {onMounted, ref } from 'vue'

// 模拟滚动条
const Scroll=ref(null);
function JSScroll(event){
  Scroll.value.scrollTop+=event.deltaY;
}

</script>



<style scoped>
*{
  list-style-type: none;
}
.Right{
  box-sizing:border-box;
  padding: 5px 10px;
  height: 1015px;
  width: 560px;
  background-color: rgba(81, 46, 238, 0.044);
}

.RightTable{
    width: 540px;
    height: 660px;
  
    overflow-x: auto;
    overflow-y: hidden;  

    scroll-behavior: smooth;
    
    display: flex;
    align-items: center;
    flex-direction: column;
}
.RightModel{
  width: 540px;
  height: 300px;

  background-color: bisque;
}

</style>
