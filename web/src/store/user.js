import $ from "jquery"
export default {
    state: {
        //一些状态 
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,

    },
    getters: {
    },
    mutations: {
        // 更新state
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;

        },
        updateToken(state, token) {
            state.token = token;

        },
        logout(state) {
            // 消除所有状态实现登出工作
            state.id = "";
            state.username = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
        }
    },
    actions: {
        // 更新state,先完成注册页面，信息绑定，然后网站跳转，信息返回
        login(context, data) {
            $.ajax({
                url: "http://localhost:3000/user/account/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            });
        },
        getinfo(context, data) {
            //改一改也可用于调试info模块（获取信息的部分
            $.ajax({
                url: "http://localhost:3000/user/account/info/",
                type: "get",
                headers: {
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp) {
                    if (resp.error_message === 'success') {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        });
                        data.success(resp);
                    } else {
                        data.error(resp);

                    }

                    // console.log(resp); 控制台显示信息
                },
                error(resp) {
                    data.error(resp);

                    // console.log(resp);
                }
            });
        },
        logout(context){
            context.commit("logout");
        }
    },
    modules: {
    }
}