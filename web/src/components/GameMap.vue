<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" tabindex="0">

        </canvas>
    </div>
</template>

<script>
import { GameMap } from "@/assets/scripts/GameMap";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const store = useStore();
        let parent = ref(null);
        let canvas = ref(null);
        onMounted(() => {
            // 取值要用value
            // vue调用js代码进行组建web页面
            store.commit("updateGameObject",
                new GameMap(canvas.value.getContext('2d'), parent.value, store)
            ); // js里有具体生成地图的操作
        });
        return {
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
div.gamemap {
    width: 100%;
    height: 100%;
    /* 居中 */
    display: flex;
    /* 水平居中 */
    justify-content: center;
    /* 竖直居中 */
    align-items: center;
}
</style>