<template>
    <ContentField v-if="!$store.state.user.pulling_info">
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="error_message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-success">提交</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '../../../components/ContentField.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
import router from '../../../router/index';
export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');
        // // 加个变量，防止闪登录界面
        // let show_content = ref(false);

        // 加一个验证，保证f5刷新不重新验证
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            store.commit("updateToken", jwt_token);
            store.dispatch("getinfo", {
                success() {
                    router.push({ name: "home" });
                    store.commit("updatePullingInfo", false);
                },
                error() {
                    store.commit("updatePullingInfo", false);
                }
            })
        } else {
            store.commit("updatePullingInfo", false);
        }

        const login = () => {
            error_message.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch("getinfo", {
                        success() {
                            router.push({ name: 'home' });
                            // console.log(store.state.user);

                        }
                    })
                    // console.log(resp);  此时success有参数resp
                    // router.push({name:'home'});// 成功自动跳转home页面
                },
                error() {
                    error_message.value = "用户名或密码错误";

                }
            })
        }
        return {
            username,
            password,
            error_message,
            login,
            // // 新增的变量要返回，这样前边才可以使用
            // show_content,

        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
}

div.error_message {
    color: red;
}
</style>