<template>
      <div class="BodyTable">
        <div class="left">
        <NumCharts class="left-1"/>
        <PieCharts class="left-2"/>
        <ListTable class="left-3"/>
        </div>

      <div class="center">
      <TittleMsg class="center-1"/>
      <div class="Buttons">
      <button class="MapButton" @click="Floot">足迹地图</button>
      <button class="MapButton" @click="Plane">航线地图</button>
      <button class="MapButton" @click="Train">铁路地图</button>      
    </div>
          <Map class="center-2"/>
          <BarCharts class="center-3"/>
        </div>  
        
      <RightTable class="right-1"/> 
    </div>

</template>

<script setup>
import NumCharts from '@/components/MainWindow/NumCharts.vue'
import PieCharts from '@/components/MainWindow/PieCharts.vue'
import ListTable from '@/components/MainWindow/ListTable.vue'
import Map from '@/components/MainWindow/Map.vue'
import BarCharts from '@/components/MainWindow/BarCharts.vue'
import TittleMsg from '@/components/MainWindow/TittleMsg.vue'
import RightTable from '@/components/MainWindow/RightTable.vue'


//导入pinia数据
import { storeToRefs  } from 'pinia'
import { usePanelConfigStore, useMapShowConfigStore} from '@/store'
//导入面板配置项
const ConfigStore = usePanelConfigStore()
//定义地图注册号 MapCode; 地图类型MapType
const { PanelType, MapCode} = storeToRefs(ConfigStore)
//导入地图显示配置数据
const useMapShowConfig = useMapShowConfigStore()
const { Fresh, ShowAirport, ShowRoute, ShowTrain } = storeToRefs(useMapShowConfig)

function Floot(event){
  //设置为航空面板，普通地图
  PanelType.value = 'Normal';
  ShowAirport.value=false;
  ShowRoute.value = false;
  ShowTrain.value = false;
  Fresh.value=!Fresh.value;
}
function Plane(event){
  //设置为航空面板，航线图
  PanelType.value = 'Flight';
  ShowAirport.value=true;
  ShowRoute.value = true;
  ShowTrain.value = false;
  Fresh.value=!Fresh.value;
}
function Train(event){
  //设置为铁路面板，列车图
  PanelType.value = 'Train';
  ShowAirport.value=false;
  ShowRoute.value = false;
  ShowTrain.value = true;
  Fresh.value=!Fresh.value;
}

</script>

<style scoped>

.BodyTable{
  display: flex;
}
.left-3{
  padding-bottom: 5px;
}
button:hover{
    background: radial-gradient(rgba(136, 200, 246, 0),rgba(178, 219, 234, 0.5));
}
.Buttons{
  width: 800px;
  display: flex;
  justify-content: center;
  
}
.MapButton{
  height: 40px;
  width: 150px;
  margin-right: 10px;
  border: 2px solid rgb(6, 251, 247);

  background: radial-gradient(rgba(0, 225, 229, 0),rgba(0, 225, 229, .2));

  font-family:'SimHei';
  font-weight: bold;
  font-size: 20px;
  color: rgb(50, 226, 246);
  z-index: 111;
}
</style>