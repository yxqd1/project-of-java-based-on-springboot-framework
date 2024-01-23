// 游戏区域
<template>
    <div class="playground">
      <GameMap />  
    </div>
</template>

<script>
import GameMap from './GameMap.vue';

export default{
    components:{
        GameMap,
    }
}
</script>

<style scoped>
/* css 样式 */
div.playground{
    width: 60vw;
    height: 70vh;
    /* background: lightblue; */
    margin: 20px auto;
}
</style>