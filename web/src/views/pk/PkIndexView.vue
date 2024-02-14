<template>
    <!-- 这里涉及页面之间的切换，所以在store中加入全局变量 -->
    <!-- 页面之间的选择切换 -->
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <!-- 那个对应的上用哪个 -->
    <MatchGround v-if="$store.state.pk.status === 'matching'" />
</template>

<script>
import PlayGround from '../../components/PlayGround.vue'
import MatchGround from '../../components/MatchGround.vue'
// 导入  当组件被加载时的函数   当组件被卸载时的函数
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        PlayGround,
        MatchGround,
    },
    setup() {
        // 引入全局变量
        const store = useStore();
        const socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.user.token}/`;

        let socket = null;

        // 连接挂起
        onMounted(() => {
            store.commit("updateOpponent", {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",

            })
            socket = new WebSocket(socketUrl);
            // 打开
            socket.onopen = () => {
                console.log("connected!");
                // 提交信息连接
                store.commit("updateSocket", socket);

            }
            // 信息交互
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                // console.log(data);
                // 匹配成功的话，photo进行变化
                if (data.event === "start-matching") {
                    store.commit("updateOpponent", {
                        username: data.opponent_username,
                        photo: data.opponent_photo,
                    });
                    // 时间延迟展示信息
                    setTimeout(() => {
                        store.commit("updateStatus", "playing");
                    }, 2000);
                    store.commit("updateGamemap", data.gamemap);

                }
            }
            // 关闭
            socket.onclose = () => {
                console.log("disconnected!");
            }
        });
        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus", "matching");

        })
    }
}
</script>

<style scoped></style>