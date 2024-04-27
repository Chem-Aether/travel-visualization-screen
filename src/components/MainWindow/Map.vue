<template>
  <div class="map" v-if="CityPercentSource">
    <button class="Up" @click="Up">上一级</button>
    <div ref="charts" style="width: 100%;height:560px;padding-top: 50px;box-sizing: border-box;"></div>
  </div>

</template>

<script setup>
import { ref, onMounted ,watch} from 'vue';

//导入pinia数据
import { storeToRefs  } from 'pinia'
import { usePanelConfigStore, usePanelDataSourceStore, useMapShowConfigStore} from '@/store'
//导入面板配置项
const ConfigStore = usePanelConfigStore()
//定义地图注册号 MapCode; 面板类型PanelType
const { PanelType, MapCode} = storeToRefs(ConfigStore)
//导入组件数据
const DataSourceStore = usePanelDataSourceStore()
//城市探索柱状图数据 CityPercentSource
const {CityPercentSource, Route, Airport, RailwayStation, ScenicSpotSource } = storeToRefs(DataSourceStore)
//导入地图显示配置数据
const useMapShowConfig = useMapShowConfigStore()
const { Fresh, ShowAirport, ShowRoute, ShowTrain } = storeToRefs(useMapShowConfig)


//网络请求
import {getCityPercentSourceData, getAirportData, getPlaneRouteData, getRailwayStationData, getScenicSpotData} from '@/aips';
// //请求柱状图探索信息
Promise.all([getCityPercentSourceData(),getAirportData(), getPlaneRouteData(),getRailwayStationData()]).then(
  ([A,B,C,D]) => {
    CityPercentSource.value = A;
    Route.value= B;
    Airport.value = C;
    RailwayStation.value = D;
  }
)


//取Dom元素
const charts = ref();
import {getGeoData} from '@/aips'
//初始化地图数据
let GeoData = await getGeoData('china')


function CreateMapOption(name,MapData = [],route = true,airport = true,train = true){
  let option = {
          geo: {
              map: name, 
              roam: false,
              selectedMode: false, 
              zoom: 'zoom',
              top: 'top',
              show: true,
              itemStyle: {
                  borderColor: "rgba(111, 241, 184)",
                  borderWidth: 1,
                  areaColor: {
                      type: "radial",
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [
                          {
                              offset: 0,
                              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                          },
                          {
                              offset: 1,
                              color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                          },
                      ],
                      globalCoord: false, // 缺为 false
                  },
                  shadowColor: "rgba(128, 217, 248, .3)",
                  shadowOffsetX: -2,
                  shadowOffsetY: 2,
                  shadowBlur: 10,
              },
              emphasis: {
                  label: {
                      show: false,
                  },
                  itemStyle: {
                      areaColor:{
                          type: "radial",
                          x: 0.5,
                          y: 0.5,
                          r: 0.8,
                          colorStops: [
                              {
                                  offset: 0,
                                  color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                              },
                              {
                                  offset: 1,
                                  color: "rgba(56,155,183, .8)", // 100% 处的颜色
                              },
                          ],
                          globalCoord: false, // 缺为 false
                      },
                      borderWidth: 1,
                  },
              },
          },
          visualMap: {
            type:'piecewise',
            show:false,
            splitNumber:10, 
            pieces: [
              {lte:100,gt:90,color:'rgba(37, 163, 223)'},
              {lte:90,gt:80,color:'rgba(49, 171, 226)'},
              {lte:80,gt:70,color:'rgba(75, 187, 233)'},
              {lte:70,gt:60,color:'rgba(87, 195, 236)'},
              {lte:60,gt:50,color:'rgba(100, 204, 239)'},
              {lte:50,gt:40,color:'rgba(112, 212, 242)'},
              {lte:40,gt:30,color:'rgba(125, 220, 245)'},
              {lte:30,gt:20,color:'rgba(138, 228, 249)'},
              {lte:20,gt:10,color:'rgba(150, 236, 252,0.8)'},
              {lte:10,gt:0,color:'rgba(163, 244, 255,0.9)'},
              {lte: 0,color:{
                      type: "radial",
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [
                          {
                              offset: 0,
                              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                          },
                          {
                              offset: 1,
                              color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                          },
                      ],
                      globalCoord: false, // 缺为 false
                  }}
            ],
            seriesIndex:0,
            left: 20,
            bottom: 20,
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor :'rgba(50,50,50,0.7)',
            borderColor:'#6e8fda',
            textStyle:{
              color:'#ffff',
              align:'left'
            },
            formatter:  (params) => { 
                  // console.log(params.name,params.value);
                  if(params.value){
                    return `${params.name}<br />已探索：<strong style="color: red;">${params.value}%</strong>`
                  }
                  else{
                    return `${params.name}<br /><strong style="color: red;">尚未探索</strong>`
                  }
          }
          },
          dataset: {
            dimensions: ['name','percent'],
            source: MapData,
          },
          legend:{
            show:false,
            selected:{
              'route':route,
              'airport':airport,
              'train':train,
            }
          },
          series: [
            {
              geoIndex:0,
              type: "map",
              map: name,
              // data:MapData.foot,
              //禁止选中
              selectedMode:false,
            },
            {
              name:'airport',
              geoIndex:0,
              type:'scatter',
              data:Route.value,
              coordinateSystem:"geo",
              itemStyle: {            
                borderWidth:1,
                color: 'rgb(65, 250, 170)',
              },
              tooltip:{
                trigger:'item',
                formatter:'{b}',
              },
            },            
            {
              name:'route',
              geoIndex:0,
              type:'lines',
              data:Airport.value,
              lineStyle:{
                color:'rgb(255, 255, 255)',
                width:2,
                curveness:0.3, //弧度
              },
                zlevel:1,
                effect: {
                show: true,
                period: 4,
                trailLength: 0,
                color: 'rgb(255, 202, 102,.8)',
                symbolSize: 15,
                symbol:'path://M-122.27,388.39c1.54.13,2.81,1.22,3.85,3.27a14.85,14.85,0,0,1,1.54,6.75v7.75l20.62,12.9a1,1,0,0,1,.5,1.09l-.78,5.39a.91.91,0,0,1-.31.59.53.53,0,0,1-.19.15,1,1,0,0,1-.89.12l-18.95-5.51v12.47l5.94,3.39a1,1,0,0,1,.55.93v4.64a1.12,1.12,0,0,1-.33.77l0,0a1.21,1.21,0,0,1-.9.27l-10.62-1.51-10.61,1.51a1,1,0,0,1-.86-.23,1.13,1.13,0,0,1-.39-.82l0-4.64a1.06,1.06,0,0,1,.33-.77.56.56,0,0,1,.22-.17l5.93-3.39V420.92l-18.94,5.47a1.14,1.14,0,0,1-1-.17,1,1,0,0,1-.42-.87v-6.17a1,1,0,0,1,.54-.91l19.82-12.18v-7.7a15,15,0,0,1,1.54-6.75c1-2,2.31-3.12,3.86-3.25Z',
              },
              tooltip:{
                trigger:'item',
                formatter: '{b}',
              },
            },
            {
              name:'train',
              Enabled:false,
              geoIndex:0,
              type:'scatter',
              data:RailwayStation.value,
              coordinateSystem:"geo",
              symbol:'path://M895.616384 347.812188q0 10.22977-0.511489 19.436563t-1.534466 19.436563q-9.206793 84.907093-37.338661 163.164835t-71.096903 150.377622-99.228771 138.613387-121.734266 127.872128q-9.206793 11.252747-23.528472 11.252747-15.344655 0-24.551449-11.252747-65.470529-61.378621-122.245754-128.895105t-100.251748-141.170829-71.608392-152.935065-36.315684-165.210789q0-8.183816-0.511489-15.344655t-0.511489-15.344655q0-71.608392 28.131868-135.032967t76.211788-110.481518 113.038961-74.677323 138.613387-27.62038 138.101898 27.62038 112.527473 74.677323 76.211788 110.481518 28.131868 135.032967zM540.643357 507.396603q33.758242 0 63.424575-12.787213t51.66034-34.26973 34.781219-50.637363 12.787213-61.89011-12.787213-61.89011-34.781219-50.637363-51.66034-34.26973-63.424575-12.787213-63.424575 12.787213-52.171828 34.26973-35.292707 50.637363-12.787213 61.89011 12.787213 61.89011 35.292707 50.637363 52.171828 34.26973 63.424575 12.787213z',
              symbolSize:10,
              itemStyle: {            
                // borderWidth:1,
                color: 'rgb(256,0,0)',
              },
              label:{
                show:true,
                position:'bottom',
                formatter:'{b}',
                fontSize:12,
              },
              tooltip:{
                trigger:'item',
                formatter:'{b}',
              },
            },   
          ]
};
  return option;
}

import * as echarts from 'echarts';
var myChart = null;
onMounted(() => {
  
  myChart = echarts.init(charts.value);
  echarts.registerMap(MapCode.value, GeoData);
  
  myChart.setOption(CreateMapOption(MapCode.value,CityPercentSource.value,ShowRoute.value,ShowAirport.value,ShowTrain.value),true);

  myChart.on('click',(event) => {
    GeoData.features.forEach(element => {
      if (element.properties.name === event.name)
      {
        MapCode.value = element.properties.adcode;
        console.log(MapCode.value);       
      };
    });
})
})


watch(MapCode,() => {
  console.log('geodata已变化');
  Promise.all([getGeoData(MapCode.value),getCityPercentSourceData(MapCode.value) , getScenicSpotData()]).then(
    ([geodata,bardata,spotdata]) => {
      GeoData = geodata;
      CityPercentSource.value = bardata;
      ScenicSpotSource.value = spotdata;

      ShowRoute.value = false;
      Fresh.value=!Fresh.value;
  })


});

watch(Fresh,() => {
  console.log('fresh');
  echarts.registerMap(MapCode.value, GeoData);
  
  myChart.setOption(CreateMapOption(MapCode.value,CityPercentSource.value,ShowRoute.value,ShowAirport.value,ShowTrain.value),true);

})


function Up(){
  let code;
  if (typeof(GeoData.features[0].properties.parent)=='string') {
    code = JSON.parse(GeoData.features[0].properties.parent).adcode
  }
  else{
    code = GeoData.features[0].properties.parent.adcode
  }
  let A = String(code).substring(0,2)
  let B = String(code).substring(2,4)
  let C = GeoData.features.length
  // console.log(A,B,C);
  if(C=='1'){
    if(A!='10'){MapCode.value = A+B+'00'}
    else{MapCode.value = 'china'} 
  }
  else if(B!='00'){
    MapCode.value = A+'0000'
  }
  else{
    MapCode.value = 'china'
  }
}

</script>

<style scoped>
  .map{
    height: 560px;
    width: 800px;
    position: relative;
  }
  
  .Up{
    width: 100px;
    height: 40px;
    
    position: absolute;
    bottom: 10px;
    right: 20px;
    z-index: 111;
    border: 2px solid rgb(6, 251, 247);

    background: radial-gradient(rgba(0, 225, 229, 0),rgba(0, 225, 229, .2));

    font-family:'SimHei';
    font-weight: bold;
    font-size: 20px;
    color: rgb(50, 226, 246);
  }
  button:hover{
    background: radial-gradient(rgba(136, 200, 246, 0),rgba(178, 219, 234, 0.5));
  }
</style>