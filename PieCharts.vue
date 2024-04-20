<template>
    <div class="Piecharts" v-if="PanelDataSource"><Border>
      <SmallTittle>{{ PanelDataSource.panel2.tittle }}数据统计</SmallTittle>
      <div class="icon" @click="ChangeChart">
        <svg t="1696779812136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3923" width="200" height="200">
          <path d="M674.496 1019.072l342.848-237.312a12.992 12.992 0 0 0 5.696-10.816 12.992 12.992 0 0 0-5.696-10.752l-342.848-237.44a11.776 11.776 0 0 0-12.992-0.256 12.8 12.8 0 0 0-5.824 12.096v168.64H365.632s-156.352 3.968-195.84-115.712a310.272 310.272 0 0 0 124.288 219.712c30.08 20.928 65.536 31.872 101.696 31.36h257.984v168.704c0.256 4.992 2.944 9.6 7.168 11.968a13.312 13.312 0 0 0 13.568-0.192zM352.512 3.008L9.792 240.32a12.992 12.992 0 0 0-5.696 10.816c0 4.352 2.176 8.448 5.696 10.816L352.512 499.2c3.968 2.688 8.96 2.816 12.992 0.32a12.8 12.8 0 0 0 5.888-12.096V318.784h290.048s156.288-3.84 195.84 115.776a310.272 310.272 0 0 0-124.288-219.712 173.632 173.632 0 0 0-101.76-31.36H371.584V14.72a12.8 12.8 0 0 0-5.888-12.16 11.776 11.776 0 0 0-13.12 0.384z" fill="#ffffff" p-id="3924"></path>
        </svg>    
      </div>      
      <div style="width: 100%;height:80%;">
        <div ref="Pie" style="width: 100%;height:100%;"></div>        
      </div>
    </Border></div>
</template>
  
<script setup>
import {onMounted, ref, watch} from 'vue'
import * as echarts from 'echarts';

//导入pinia数据
import { storeToRefs  } from 'pinia'
import { usePanelConfigStore, usePanelDataSourceStore} from '../store'
//导入面板配置项
const ConfigStore = usePanelConfigStore()
//导入面板类型  PanelType
const { PanelType} = storeToRefs(ConfigStore)
//导入组件数据
const DataSourceStore = usePanelDataSourceStore()
//面板统计 PanelDataSource
const {PanelDataSource,TicketDataSource } = storeToRefs(DataSourceStore)


import { getTicketData, getStatisticsData} from '../aips';
//获取航空铁路统计数据
getStatisticsData().then(
  (res) => {
    PanelDataSource.value = res
  }
)


watch(PanelType,() => {
  Promise.all([getStatisticsData(PanelType.value), getTicketData(PanelType.value)]).then(
    ([a,b]) => {
      PanelDataSource.value = a;
      console.log(a);
      PieChart.setOption(CreatePieOption(a.panel2.data,IsPie.value),true);
      TicketDataSource.value = b;
    }
  )
})

//取DOM元素
const Pie = ref();



//生成配置项
function CreatePieOption(Data,Is) {
  if(Is){
    return {
            dataset: {
              dimensions: ['name','num'],
              source: Data,
            },
            series: [
              {
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8
                },
                label:{
                  color:'#ffff',
                  fontWeight:'bold',
                  formatter: '{b}: {d}%',
                },
              }
            ],
            
          };
  }
  else{
    return {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              backgroundColor :'rgba(50,50,50,0.7)',
              borderColor:'#6e8fda',
              textStyle:{
                color:'#ffff',
                align:'left',
              },
              formatter:  (params) => { 
                // console.log(params[0].color);
                var tip = `${params[0].value.name} 
                            <br/><strong style="color: ${params[0].color};font-size:20px;">${params[0].value.num}</strong> 次`
                            return  tip
                    }
            },
            grid: {
              left: '3%',
              right: '10%',
              bottom: '3%',
              containLabel: true,
            },
            dataset: {
              dimensions: ['name','num'],
              source: Data,
            },
            yAxis: { 
              type: 'category',
              inverse:true,
              axisLabel:{
                show: true,
                formatter: function (params) {
                                      var val = "";
                                      if (params.length > 4) {
                                          val = params.substr(0, 4) + '...';
                                          return val;
                                      } else {
                                          return params;
                                      }
                                  },
                color:'#ffff',
              },
              axisTick:{
                    show:false,
              },
              axisLine: {
                    show: false,
              },
              splitLine:{
                  show:false,
              },
            },
            xAxis: [
                  {
                      type: 'value',
                      yAxisIndex: 0,
                      axisTick:{
                          show:false,
                      },
                      axisLine: {
                          show: false,
                      },
                      splitLine:{
                          show:false,
                      },
                      axisLabel: {
                          show: false, 
                        },
                  }
              ],
            series: [
              {
                realtimeSort: true,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(256,256,256, 0)',
                  borderRadius: [20,20,20,20], 
                  borderWidth:'.5',
                  borderColor:'#ffff'
                },
                itemStyle: {
                    borderRadius: [50, 50],
                },
                label: {
                    show: true,
                    position: 'right',
                    fontSize: '15px',
                    color: '#ffff',
                    formatter:  (params) => { 
                        return  params.value.num
                    }
                }
              }
            ],
            visualMap: {
              show:false,
              orient: 'horizontal',
              left: 'center',
              min: 0,
              max: 7,
              dimension: 1,
              inRange: {
                color: ['#37a2da', '#32c5e9', '#67e0e3','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293']
              }
            },
          };
  }
}

//选择饼图 or 柱状图
var IsPie = ref(false);

//初始化挂载
var PieChart = null;
onMounted(() => {
  PieChart = echarts.init(Pie.value);
  PieChart.setOption(CreatePieOption(PanelDataSource.value.panel2.data,IsPie.value),true);
})  
//按钮切换事件
function ChangeChart(){
  IsPie.value=!IsPie.value;
  console.log(PanelDataSource.value.panel2.data,'099');
  PieChart.setOption(CreatePieOption(PanelDataSource.value.panel2.data,IsPie.value),true);
}

</script>
  
<style scoped>
  .Piecharts{
    font-size: 30px;
    text-align: center;
    color: rgb(3, 3, 3);
    /* background-color: rgb(255, 104, 159); */
    box-sizing:border-box;
    padding: 5px 10px;
    height: 340px;
    width: 560px;
  }
  .icon{
    position: absolute;
    right: 15px;
    top: 15px; 
    z-index: 111;
  }
  .icon svg{
    margin-left: 10px;
    width: 25px;
    height: 25px;
  }
  svg:hover path{
    fill: aquamarine;
  }
</style>