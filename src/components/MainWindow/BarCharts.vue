<template>
    <div class="Barcharts" v-if="CityPercentSource"><Border>
      <SmallTittle>城市探索报告</SmallTittle>
      <div style="width: 100%;height:90%;">
        <div ref="Bar" style="width: 100%;height:100%;"></div>        
      </div>
    </Border></div>
</template>

<script setup>
import {onMounted, ref, watch, nextTick} from 'vue'
import * as echarts from 'echarts';

//导入pinia数据
import { storeToRefs  } from 'pinia'
import { usePanelConfigStore, usePanelDataSourceStore} from '@/store'
//导入面板配置项
const ConfigStore = usePanelConfigStore()
//定义地图注册号 MapCode; 地图类型MapType
const { MapCode  } = storeToRefs(ConfigStore)
//导入组件数据
const DataSourceStore = usePanelDataSourceStore()
//城市探索柱状图数据 CityPercentSource
const {CityPercentSource } = storeToRefs(DataSourceStore)


//取DOM元素
const Bar = ref();
import {getCityPercentSourceData} from '@/aips'
//初始化地图数据
CityPercentSource.value = await getCityPercentSourceData('china')

//渐变色方案
  const yData1GradientColor = [
    {
        offset: 0, //offset表示位置【0,1】范围，0表示起始位置，1表示结束位置
        color: '#8063B0' // 起始位置设置此颜色，终止位置设置下面的颜色
    },
    {
        offset: 1,
        color: '#342A61'
    }
]
  const yData2GradientColor = [
      {
          offset: 0,
          color: '#9781D4'
      },
      {
          offset: 1,
          color: '#3BA1E3'
      }
]
  
//构建配置项
function CreateBarOption(Data) {
  let Bar_option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor :'rgba(50,50,50,0.7)',
    borderColor:'#6e8fda',
    textStyle:{
      color:'#ffff',
      align:'left'
    },
  },
  legend:{
    show: true,
    top:"5%",
    textStyle:{
      color:"#ffffff",
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  dataset: {
    dimensions: ['name','went','total', 'percent'],
    source: Data,
  },
  xAxis: { 
    type: 'category',
    axisLabel:{
      show: true,
      rotate:"60",
      formatter: function (params) {
                            var val = "";
                            if (params.length > 4) {
                                val = params.substr(0, 4) + '...';
                                return val;
                            } else {
                                return params;
                            }
                        }
    },
    axisTick: {
      show:false,
      alignWithLabel: false,
    },
  },
  yAxis: [
        {
            type: 'value',
            yAxisIndex: 0,
        },
        {
            type: 'value',
            min: 0,
            max: 100,
            interval: 25, 
            axisLabel: {
                formatter: "{value}%",
            },
        },
    ],
  series: [
  { 
      type: 'bar',
      name:'已探索',
      barGap: "-100%",
      z:1,
      itemStyle: {
                borderRadius: [20, 20, 6, 6],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, yData2GradientColor),
            }
    },
    { 
      type: 'bar' ,
      name:'总计',
      z:0,
      itemStyle: {
                borderRadius: [20, 20, 6, 6], 
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, yData1GradientColor),
            }
    },
    {
      type: 'line',
      name: '探索率(%)',
      z:2,
      yAxisIndex: 1,
      symbolSize: 10,
      smooth:true,
      itemStyle: {
          color: '#d82aaf',
      },
      lineStyle: {
          color: "#d82aaf",
      },

    }
  ]
};
  return Bar_option;
}

//初始化挂载
var myChart = null;
onMounted(() => {
    myChart = echarts.init(Bar.value);
    myChart.setOption(CreateBarOption(CityPercentSource.value),true);
})

watch(CityPercentSource,() => {
  if (myChart) {
    myChart.setOption(CreateBarOption(CityPercentSource.value),true);    
  }

})
</script>

<style scoped>
  .Barcharts{
    font-size: 30px;
    text-align: center;
    color: red;

    box-sizing:border-box;
    padding: 5px 10px;
    height: 340px;
    width: 800px;
  }

</style>