<template>
  <!-- html -->
  <NavBar />
  <!-- 路径根据router来定义 -->
  <router-view></router-view>
</template> 

<script>
// js
import NavBar from "@/components/NavBar.vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
// import $ from "jquery"
// 对象
export default {
  components: {
    NavBar
  },
  setup() {
  }
}
</script>

<style>
/* css */
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
  margin: auto auto;
}
</style>
