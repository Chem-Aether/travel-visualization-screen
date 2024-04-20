<template>
    <div class="border1">
        <slot></slot>
    </div>
</template>

<script>

</script>

<style scoped>

.border1{
    border: 2px solid #02a6b5;
    width: 100%;
    height: 100%;
    position: relative;
    margin: auto;
    box-sizing: border-box;
}
.border1:before{content: '';
    position: absolute;
    width: 88%;
    bottom: -2px;
    top: -2px;
    left: 6%;
    border-bottom: 2px solid #0b3146;
    border-top: 2px solid #0b3146;
}
</style>