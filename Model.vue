<template><border>
  <div class="carousel">
    <div class="carousel-inner" :style="carouselPosition">
      <div class="carousel-item"><img src="@/assets/img/picture1.jpg" alt="图片1"></div>
      <div class="carousel-item"><img src="@/assets/img/picture2.jpg" alt="图片2"></div>
      <div class="carousel-item"><img src="@/assets/img/picture3.jpg" alt="图片3"></div>
      <div class="carousel-item"><img src="@/assets/img/picture4.jpg" alt="图片4"></div>
      <div class="carousel-item"><img src="@/assets/img/picture5.jpg" alt="图片5"></div>
    </div>
    <!-- 左右切换按钮 -->
    <div class="Buttonns">
      <button class="prev-arrow" @click="prev">&#10094;</button>
      <button class="next-arrow" @click="next">&#10095;</button>
    </div>

  </div></border>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const currentIndex = ref(0);
const interval = ref(null);

const carouselPosition = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 100}%)`,
  };
});

function next() {
  currentIndex.value = (currentIndex.value + 1) % 5; // 假设有5张图片
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + 5) % 5; // 假设有5张图片
}

function startAutoPlay() {
  interval.value = setInterval(next, 3000); // 每3秒切换一次
}

function stopAutoPlay() {
  clearInterval(interval.value);
}

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.carousel {
  overflow: hidden;
  position: relative;

  width: 100%;
  height: 100%;
}
.carousel-inner {
  width: 100%;
  height: 100%;

  display: flex;
  transition: transform 0.5s ease-in-out;

  width: 100%;
  height: 100%;
}
.carousel-item {
  width: 100%;
  height: 100%;
}

.carousel-item img {
  /* width: 100%; */
  /* height: 100%; */
  object-fit: cover;
}
.Buttonns {
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0px;
}

.prev-arrow, .next-arrow {
  /* transform: translateY(-50%); */
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: white;
  padding: 10px;
  z-index: 100;
}

</style>
