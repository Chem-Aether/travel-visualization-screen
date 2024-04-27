import { defineStore,storeToRefs  } from 'pinia'
import { ref , computed,reactive  } from 'vue'

export const usePanelConfigStore = defineStore('PanelConfig', () => {
    //PanelType
    //Normal:普通地图; Flight:航线图; Train:列车图;
    const PanelType = ref('Normal')
    const MapCode = ref('china')

    return { PanelType, MapCode}
  })

export const useMapShowConfigStore = defineStore('MapShowConfig',() => {  
  //是否刷新
  const Fresh = ref(true);
  //显示机场
  const ShowAirport = ref(true);
  //显示航线
  const ShowRoute = ref(false);
  //显示火车站
  const ShowTrain = ref(true);

  return { Fresh,ShowAirport,ShowRoute,ShowTrain }
  })


export const usePanelDataSourceStore = defineStore('PanelDataSource', () => {

    //左侧两面板数据源
    const PanelDataSource = ref();
    //车票机票数据源
    const TicketDataSource = ref();
    //旅游景点数据源
    const ScenicSpotSource = ref();
    //城市探索率数据源
    const CityPercentSource = ref(null);
    //总合计数据
    const Total = ref();
    //航线数据
    const Route = ref();
    //机场数据
    const Airport = ref();
    //铁路站点数据
    const RailwayStation=ref();

  
    return {PanelDataSource, TicketDataSource, ScenicSpotSource, CityPercentSource, Total, Route, Airport, RailwayStation}
  })