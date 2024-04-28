<template>
  <div class="ListTable" v-if="ScenicSpotSource">
    <Border>
      <SmallTittle  style="margin-bottom: 10px;">行程统计</SmallTittle>
      <div class="Content" ref="AutoScroll" @mouseenter="mEnter" @mouseleave="mLeave" @wheel="mScroll">
        <div class="column" v-for="each, index in ScenicSpotSource" >
          <a href="/SpotsMsg">
          <div class="columnContent">
            <div class="ID">{{ index+1 }}</div>
            <div class="Msg">
              <div class="Name">{{ each.name }}</div>
              <div class="Adder">
                <span style="color: rgb(157, 157, 164);">地址：</span>
                <span>{{ each.Adder }}</span>
              </div>
            </div>
            <div class="Rank" v-html="SetText(each.Rank)"></div>
          </div>
          <div class="UnderLine"></div>
          </a>
        </div>           
      </div>          
    </Border>    
  </div>
  
</template>

<script setup>
import { ref ,onMounted} from 'vue'

//导入pinia数据
import { storeToRefs  } from 'pinia'
import { usePanelDataSourceStore} from '@/store'
const DataSourceStore = usePanelDataSourceStore()
//景点数据 ScenicSpotSource
const {ScenicSpotSource } = storeToRefs(DataSourceStore)

//网络请求
import {getScenicSpotData} from '@/aips';
//请求景点信息
// getScenicSpotData().then(
//   (res) => {
//     ScenicSpotSource.value = res
//   }
// )

//获取DOM
const AutoScroll = ref()
//定时器
let Timer = null;
onMounted(()=>{
  //请求景点信息
getScenicSpotData().then(
  (res) => {
    ScenicSpotSource.value = res;
    Timer = setInterval(scroll,10);  
  }
)
  
})

function scroll(){
    AutoScroll.value.scrollTop++

    let scrollItemBox = AutoScroll.value.children[0].clientHeight+10
    // 当判断滚动的高度大于等于盒子高度时，从头开始滚动
    if (AutoScroll.value.scrollTop >= scrollItemBox){
        AutoScroll.value.insertBefore(AutoScroll.value.children[0],null)
        AutoScroll.value.scrollTop = 0;
    }
}

function mEnter(){
  clearInterval(Timer);
}

function mLeave() {
  Timer = setInterval(scroll,10); 
}

function mScroll(event){
  AutoScroll.value.scrollTop+=Math.sign(event.deltaY)*(AutoScroll.value.children[0].clientHeight+10)
}

//设置提示内容
function SetText(params) {
  switch (params) {
    case '0':
      return '<span style="color: rgb(0, 255, 30);">5A景区</span>'
      break;
    case '1':
      return '<span style="color: rgb(255, 0, 0)">人文景区</span>'
      break;
  
    default:
      return '<span style="color: white">城市景区</span>'
      break;
  }
}

</script>

<style scoped>
  .ListTable{
    font-size: 30px;
    text-align: center;
    
    box-sizing:border-box;
    padding: 5px 10px;
    height: 340px;
    width: 560px;

  }
  .Content{
    height: 280px;
    overflow: hidden;
    /* scroll-behavior: smooth; */
    display: flex;
    align-items:center;
    flex-direction: column;
  }

  .column{
    z-index: 0;
    width: 90%;
    height: 65px;
    margin-top: 10px;

    display: flex;
    align-items:flex-end;
    justify-content:center;
    flex-direction: column;
  }
  .columnContent{
    width: 100%;
    height: 65px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .UnderLine{
    width: 90%;
    height: 5px;
    margin-right: 15px;

    margin-top: 5px;
    border-bottom: dashed rgb(0, 220, 255) 3px;
  }
  .ID{
    width: 25px;
    height: 25px;
    border-radius: 25%;

    font-size: 15px;
    text-align: center;
    line-height: 30px;
    color: black;


    background-color: rgb(230, 237, 192);
  }
  .Msg{
    width: 350px;
    height: 60px;
  }
  .Name,.Adder{
    padding-left: 15px;

    text-align: left;
    font-size: 10px;
  }
  .Name{
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;

    color: rgb(24, 144, 255);
  }
  .Adder{
    height: 20px;

    color: beige;
  }
  .Rank{
    width: 100px;
    height: 30px;

    font-size: 15px;
    text-align: center;
    line-height: 30px;
    color: rgb(0, 255, 30);
  }
  .red{
    color: yellow;
  }
</style>