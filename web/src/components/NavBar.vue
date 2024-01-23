<!-- 组件，有三个部分 -->
<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
  <!-- container-fluid导航栏会宽一点 -->
    <div class="container">
    <!-- <a class="navbar-brand" href="#">Blue</a> -->
    <router-link class="navbar-brand" :to="{name:'pk_index'}">Blue</router-link>
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ">
          <router-link :class="route_name == 'pk_index'?'nav-link active' :'nav-link'" :to="{name:'pk_index'}">对战</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'record_index'?'nav-link active' :'nav-link'" :to="{name:'record_index'}">对局列表</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'ranklist_index'?'nav-link active' :'nav-link' " :to="{name:'ranklist_index'}">排行榜</router-link>
        </li>
      </ul>
      <!-- 复制上半部分 -->
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            yxqd
          </a>
          <ul class="dropdown-menu">
            <li>
                <router-link class="dropdown-item" :to="{name:'user_bot_index'}">我的bot</router-link>
            </li>
            
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import {useRoute} from 'vue-router'
import {computed} from 'vue'

export default{
  setup() {
    const route = useRoute();
    let route_name = computed(() => route.name)
    return {
      route_name
    }
  }
}
</script>


<!-- 有随机字符串 -->
<style scoped>

</style>