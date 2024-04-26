<template>
<suspense> <v-scale-screen     
    width="1920"
    height="1080"
    :delay="500"
    :fullScreen="false"
    :boxStyle="{
      background: '#03050c',

    }"
    :wrapperStyle="null"
    :autoScale="true"
>
    <div class="BodyMain">
      <Header tittle="旅行足迹可视化平台"/>
      <!-- <MainWindow /> -->
      
      <router-view></router-view>
      
    </div>

</v-scale-screen></suspense>
</template>


<script setup>
import VScaleScreen from 'v-scale-screen'

import Header from '@/components/Header.vue'
import MainWindow from '@/components/MainWindow/MainWindow.vue'


</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  cursor:default;
}
.BodyMain {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-image: url('@/assets/img/pageBg.png');
}

</style>
