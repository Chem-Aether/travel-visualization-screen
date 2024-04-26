<template>
    <div class="line">
        <img src="@/assets/img/right.png" alt="">
        <span><slot></slot></span>
        
        <img src="@/assets/img/left.png" alt="">
    </div>
</template>

<script>

</script>

<style scoped>

    .line{
        display: flex;
        justify-content: center;
        align-items: center;
        
        box-sizing: border-box;
        padding-top: 10px;
    }
    img{
        height: 14px;
    }
    .line span{
        font-family:'SimHei';
        font-weight: bold;
        font-size: 20px;

        background: linear-gradient(92deg,#0072ff 0%,#00eaff 48.8525390625%,#01aaff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

</style>