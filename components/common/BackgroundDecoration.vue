<!-- components/common/BackgroundDecoration.vue -->
<template>
  <div class="bg-decoration">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
  </div>
</template>

<style scoped>
.bg-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  
  &-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -100px;
  }
  
  &-2 {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
  }
  
  &-3 {
    width: 150px;
    height: 150px;
    top: 50%;
    left: 10%;
  }
}
</style>