<template>
<div class="SpotsMsgBody">
    <div class="Tittle">{{ Tittle }}</div>
    <div class="Txt">
        <p>
            兵马俑，即秦始皇陵兵马俑，亦简称秦兵马俑或秦俑，是第一批全国重点文物保护单位、第一批中国世界遗产，位于今陕西省西安市临潼区秦始皇陵以东1.5千米处的兵马俑坑内。先后有200多位外国元首和政府首脑参观访问，成为中国古代辉煌文明的一张金字名片，又被誉为世界十大古墓稀世珍宝之一。
        </p>
        <p>
            兵马俑是古代墓葬雕塑的一个类别。古代施行人殉，奴隶是奴隶主生前的附属品，奴隶主死后奴隶要作为殉葬品为奴隶主陪葬。兵马俑即制成兵马（战车、战马、士兵）形状的殉葬品。

        </p>
        <p>
            1961年3月4日，秦始皇陵被国务院公布为第一批全国重点文物保护单位 。1974年3月，兵马俑被发现。1987年，秦始皇陵及兵马俑坑被联合国教科文组织批准列入《世界遗产名录》，被誉为“世界第八大奇迹”
        </p>
    </div>
    <div class="Img">
        <img src="../assets/img/bmy.jpg" alt="">
    </div>
</div>
</template>

<script setup>
import { ref, onMounted ,watch} from 'vue';
const Tittle = ref("兵马俑博物馆")

</script>

<style scoped>
.SpotsMsgBody {
    width: 1000px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.Tittle {
    color: aliceblue;
    font-size: 60px;
    font-weight: bold;

    margin: 30px 0px;
}
div p{
    color: aliceblue;
    font-size: 30px;
    text-indent: 2em;

    margin-bottom: 15px;
}
.Img {
    /* background-color: aqua;  */
    width: 500px;
    height: 350px;

    margin-top: 20px;

    background: url("../assets/img/bmy.jpg") no-repeat;
 

    background-size: contain; 

    background-image: url("../assets/img/bmy.jpg");
}
.Img img {
    height:100%;
    width:auto;
}
</style>