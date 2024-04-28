<template>
    <Map class="center-2"/>
    <BarCharts class="center-3"/>
</template>

<script setup>
import Map from '@/components/MainWindow/Map.vue'
import BarCharts from '@/components/MainWindow/BarCharts.vue'

import { storeToRefs  } from 'pinia'
import { usePanelConfigStore, usePanelDataSourceStore, useMapShowConfigStore} from '@/store'
//导入面板配置项

//定义地图注册号 MapCode; 面板类型PanelType

//导入组件数据
const DataSourceStore = usePanelDataSourceStore()
//城市探索柱状图数据 CityPercentSource
const {CityPercentSource, Route, Airport, RailwayStation, ScenicSpotSource } = storeToRefs(DataSourceStore)
//导入地图显示配置数据
const useMapShowConfig = useMapShowConfigStore()
const { Fresh, ShowAirport, ShowRoute, ShowTrain } = storeToRefs(useMapShowConfig)
import {onMounted, ref, watch, nextTick} from 'vue'
//网络请求
import {getCityPercentSourceData, getAirportData, getPlaneRouteData, getRailwayStationData, getScenicSpotData} from '@/aips';
// //请求柱状图探索信息
Promise.all([getCityPercentSourceData(),getAirportData(), getPlaneRouteData(),getRailwayStationData()]).then(
  ([A,B,C,D]) => {
    CityPercentSource.value = A;
    Route.value= B;
    Airport.value = C;
    RailwayStation.value = D;

    // console.log(A,B,C,D)
  }
)


</script>

