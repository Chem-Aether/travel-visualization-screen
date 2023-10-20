<template>
  <div class="TittleMsg" v-if="Total">
    <label class="TittleMsg-Number" style="color: rgb(255, 127, 127);">{{ Total.province }}</label>
    <label class="TittleMsg-Text">省</label>
    <label class="TittleMsg-Number" style="color: rgb(197, 255, 127);">{{ Total.city }}</label>
    <label class="TittleMsg-Text">市</label>
    <label class="TittleMsg-Number" style="color: rgb(127, 155, 255);">{{ Total.area }}</label>
    <label class="TittleMsg-Text">地区</label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { storeToRefs  } from 'pinia'
import { usePanelDataSourceStore} from '../store'
//导入组件数据
const DataSourceStore = usePanelDataSourceStore()
//标题总统计数据  Total
const {Total} = storeToRefs(DataSourceStore)

//初始化标题总统计数据
import {getTotalData} from '../aips'
getTotalData().then(
  (res) => {
    Total.value = res;
  }
)
</script>

<style scoped>
  .TittleMsg{
    /* background-color: rgb(255, 0, 0); */
    height: 80px;
    width: 800px;

    font-family:'SimHei';
    font-weight: bold;
    font-size: 45px;
    font-weight: 80px;
    text-align: center;
  }
  .TittleMsg-Number{
    padding: 0px 10px;
    font-size: 64px;
  }
  .TittleMsg-Text{
    background: linear-gradient(92deg,#0072ff 0%,#00eaff 48.8525390625%,#01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>