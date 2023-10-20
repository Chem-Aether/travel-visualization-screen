import { request, fr } from "./request";



//获取总探索统计数据
export async function getTotalData() {
    let data;
    await request({
        url:'/getTotalData',
        method:'get'
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取地理地图数据
export async function getGeoData(code='china') {
    let data;
    await request({
        url:`/getGeoData`,
        method:'post',
        data:{
            code:code
        }
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取航空/铁路统计数据
export async function getStatisticsData(type='Normal') {
    let data;
    await request({
        url:'/getStatisticsData',
        method:'post',
        data:{
            type:type
        }
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取车票机票信息
export async function getTicketData(type='Normal') {
    let data;
    await request({
        url:'/getTicketData',
        method:'post',
        data:{
            type:type
        }
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取景区足迹
export async function getScenicSpotData(code='china') {
    let data;
    await request({
        url:'/getScenicSpotData',
        method:'post',
        data:{
            code:code
        }
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取柱状图统计数据
export async function getBarData(code='china') {
    let data;
    await request({
        url:'/getBarData',
        method:'post',
        data:{
            code:code
        }
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取地图中已探索的机场
export async function getAirportData() {
    let data;
    await request({
        url:'/getAirportData',
        method:'get'
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取地图中已探索的火车站
export async function getRailwayStationData() {
    let data;
    await request({
        url:'/getRailwayStationData',
        method:'get'
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取地图中已探索的航线
export async function getPlaneRouteData() {
    let data;
    await request({
        url:'/getPlaneRouteData',
        method:'get'
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}



//以下是测试用

//获取铁路数据
export async function getData(type='Flight') {
    let data;
    await request({
        url:'/TrainStatistics.json',
        method:'get'
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//获取铁路数据
export async function getTestTicketData(type='Flight') {
    let data;
    await request({
        url:'/Ticket0.json',
        method:'get'
    })
    .then(res =>{
        data = res.data
        // console.log(data);
    })
    return data
}

//测试post
export async function postData(type='Flight') {
    let data;
    await request({
        url:'/Ticket0.json',
        method:'post',
        data: {
            'type':type
        },
    })
    .then(res =>{
        data = res.data
        console.log(data);
    })
    return data
}

