<template>
  <div class="Ticket" v-if="TicketDataSource" v-for="each in TicketDataSource">
      <div class="TicketHeader" :style="{ 'background-color': color[getRandomInt(0,color.length)]  }"></div>
      <div class="TicketTittle">
      <p class="From">{{ each['From'] }}</p>
      <div class="TicketArrow">
          <p class="TicketCode">{{each['Number']}}</p>
          <p class="TicketArea"></p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.5 5">
              <rect y="3" width="85.5" height="2" transform="translate(85.5 8) rotate(180)"/>
              <polygon points="90.5 5 79.5 0 80.72 5 90.5 5"/>
          </svg>
          <p>{{each['time']}}</p>            
      </div>
      <p class="To">{{each['To']}}</p>          
      </div>
      <div class="TicketTable">
      <ul>
          <li v-for="table,key in each['more']">{{ key }}：{{ table }}</li>
      </ul>
      </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'

//导入pinia数据
import { storeToRefs  } from 'pinia'
import { usePanelDataSourceStore} from '@/store'
//导入组件数据
const DataSourceStore = usePanelDataSourceStore()
//城市探索柱状图数据 CityPercentSource
const {TicketDataSource } = storeToRefs(DataSourceStore)

import { getTicketData } from '@/aips';
//请求车票机票信息
getTicketData().then(
  (res)=>{
    TicketDataSource.value = res;
  }
)

//随机颜色盘
const color=ref([
  '#fb7293','#fe9982','#ffca66','#c8e191','#87e3ca','#77eaf9','#33c0e7'
])
//随机设置颜色
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
</script>
  
  

<style scoped>
*{
  list-style-type: none;
}
svg{
  fill: aliceblue;
}
.Ticket{
  width: 97%;
  height: 300px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border-radius: 20px;
  /* background: radial-gradient(rgba(147, 235, 248, 0),rgba(147, 235, 248, .2)); */
  background: radial-gradient(rgba(65, 250, 170, 0),rgba(65, 250, 170, .2));

  color: rgb(255, 255, 255);
}
.TicketHeader{
  width: 100%;
  height: 40px;

  border-radius: 20px 20px 0px 0px;
  background-color: rgba(234, 150, 255, 0.9);
}
.TicketTittle{
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  position: relative;
}
.From , .To{
  width: 40%;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
}
.TicketArrow{
  margin: 0px 18px;
  width: 20%;
  position: relative;
}
.TicketArrow p{
  margin: 0px;
  font-size: 20px;

  display: flex;
  justify-content: center;
}
.TicketArrow .TicketCode{
  font-size: 24px;
  color: red;
  font-weight: bold;

  position: absolute;
  top: 5px;
  width: 100%;
}
.TicketArea{
  height: 24px;
}
.TicketTable{
  width: 100%;
}
ul{
  width: 100%;
  height: 140px;

  box-sizing: border-box;
  margin: 0px;
  padding: 0px 20px;
  padding-top: 10px;
}
ul li{
  width: 50%;
  height: 28px;
  display: inline-block;

  font-size: 18px;
  line-height: 28px;
}
</style>
  