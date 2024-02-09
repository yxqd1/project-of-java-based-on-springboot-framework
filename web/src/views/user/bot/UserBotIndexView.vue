<template>
    <div class="container">
        <div class="row">
            <!-- 左边三份 -->
            <div class="col-3">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" alt="" style="width: 100%;">
                    </div>
                </div>
            </div>
            <!-- 右边九份 -->
            <div class="col-9">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-header">
                        <!-- 使用span来对文本进行样式操作 -->
                        <span style="font-size: 130%;">
                            我的bot
                        </span>
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                            data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">新建bot</button>
                        <!-- Modal 通过id锁定按钮的 -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">New bot</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="mb-3">
                                                <label for="add-bot-title" class="col-form-label">名称</label>
                                                <input v-model="botadd.title" type="text" class="form-control"
                                                    id="add-bot-title" placeholder="请输入Bot名称">
                                            </div>
                                            <div class="mb-3">
                                                <label for="add-bot-description" class="col-form-label">简介</label>
                                                <!-- 在input后边绑定要输入的内容 textarea 可输入多行文本，不指定类型，input只输入一行文本，指定类型 -->
                                                <textarea v-model="botadd.description" class="form-control"
                                                    id="add-bot-description" rows="2" placeholder="请编写Bot简介"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label for="add-bot-code" class="col-form-label">代码</label>
                                                <VAceEditor v-model:value="botadd.content" @init="editorInit" lang="c_cpp"
                                                    theme="textmate" style="height: 300px" />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <!-- 错误信息这里需要绑定内容 -->
                                        <div class="error-message">{{ botadd.error_message }}</div>
                                        <!-- @click="" 点击按钮时，触发js的事件 -->
                                        <button type="button" class="btn btn-primary" @click="add_bot">创建</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <!-- 表格 -->
                        <table class="table table-striped table-hover" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th style="text-align: center;">名称</th>
                                    <th></th>
                                    <th style="text-align: center;">创建时间</th>
                                    <th></th>
                                    <th style="text-align: center;">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- 内容设置 -->
                                <tr v-for="bot in bots" :key="bot.id">
                                    <td></td>
                                    <td style="text-align: center;">{{ bot.title }}</td>
                                    <td></td>
                                    <td style="text-align: center;">{{ bot.createtime }}</td>
                                    <td></td>
                                    <td style="text-align: center;">
                                        <!-- 有表达式之前要加: -->
                                        <button type="button" class="btn btn-success" style="margin-right: 9px;"
                                            data-bs-toggle="modal"
                                            :data-bs-target="'#update-bot-modal-' + bot.id">修改</button>
                                        <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                            :data-bs-target="'#remove-bot-modal-' + bot.id">
                                            删除
                                        </button>
                                        <!-- 删除的Modal -->
                                        <!-- Modal -->
                                        <div class="modal fade" :id="'remove-bot-modal-' + bot.id" data-bs-backdrop="static"
                                            data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                            aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title
                                                        </h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        是否确认删除这个Bot
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary"
                                                            @click="remove_bot(bot)">删除</button>
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">取消</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- :id="'update-bot-modal-' + bot.id" -->
                                        <!-- 修改的Modal -->
                                        <div class="modal fade" :id="'update-bot-modal-' + bot.id" tabindex="-1"
                                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5">Update bot</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form>
                                                            <div class="mb-3">
                                                                <label for="update-bot-title" class="col-form-label"
                                                                    style="text-align: left;">名称</label>
                                                                <input v-model="bot.title" type="text" class="form-control"
                                                                    id="update-bot-title">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="update-bot-description"
                                                                    class="col-form-label">简介</label>
                                                                <!-- 在input后边绑定要输入的内容 textarea 可输入多行文本，不指定类型，input只输入一行文本，指定类型 -->
                                                                <textarea v-model="bot.description" class="form-control"
                                                                    id="update-bot-description" rows="2"></textarea>
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="update-bot-code"
                                                                    class="col-form-label">代码</label>
                                                                <VAceEditor v-model:value="bot.content" @init="editorInit"
                                                                    lang="c_cpp" theme="textmate" style="height: 300px" />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <!-- 错误信息这里需要绑定内容 -->
                                                        <div class="error-message">{{ bot.error_message }}</div>
                                                        <!-- @click="" 点击按钮时，触发js的事件 -->
                                                        <button type="button" class="btn btn-primary"
                                                            @click="update_bot(bot)">保存修改</button>
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">取消</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 绑定要用的变量 类
import { ref, reactive } from "vue"
import $ from 'jquery'
import { useStore } from "vuex"
// 关闭表单
import { Modal } from "bootstrap/dist/js/bootstrap"
// 引入VAceEditor组件
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';
export default {
    components: {
        VAceEditor
    },
    setup() {
        ace.config.set(
            "basePath",
            "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/");

        const store = useStore();
        let bots = ref([]);
        // 对象的绑定要用reactive
        const botadd = reactive({
            title: "",
            description: "",
            content: "",
            error_message: "",

        });
        // 实现与后端的交互
        const refresh_bots = () => {
            $.ajax({
                url: "http://localhost:3000/user/bot/getlist/",
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    bots.value = resp;

                }
            })
        }
        refresh_bots();
        // 实现与后端的交互
        const add_bot = () => {
            botadd.error_message = "";
            $.ajax({
                url: "http://localhost:3000/user/bot/add/",
                type: "post",
                // 主要看后端对应功能需要什么参数
                data: {
                    title: botadd.title,
                    description: botadd.description,
                    content: botadd.content,
                },
                // 不是公开页面的，都需要headers
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        botadd.title = "";
                        botadd.description = "";
                        botadd.content = "";
                        // 关闭表单
                        Modal.getInstance("#exampleModal").hide();
                        refresh_bots();
                    } else {
                        botadd.error_message = resp.error_message;

                    }
                }
            })
        }

        const remove_bot = (bot) => {
            $.ajax({
                url: "http://localhost:3000/user/bot/remove/",
                type: "post",
                data: {
                    bot_id: bot.id,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,

                },
                success(resp) {
                    if (resp.error_message === "success") {
                        // 注意模态框关闭问题
                        Modal.getInstance("#remove-bot-modal-" + bot.id).hide();
                        refresh_bots();
                    }
                }
            })
        }

        const update_bot = (bot) => {
            $.ajax({
                url: "http://localhost:3000/user/bot/update/",
                type: "post",
                data: {
                    bot_id: bot.id,
                    title: bot.title,
                    description: bot.description,
                    content: bot.content,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        // 关闭表单
                        Modal.getInstance("#update-bot-modal-" + bot.id).hide();
                        refresh_bots();
                    } else {
                        botadd.error_message = resp.error_message;

                    }
                }
            })
        }
        // 返回信息
        return {
            bots,
            // 变量和html的绑定
            botadd,
            add_bot,
            update_bot,
            remove_bot
        }
    }
}
</script>

<style scoped>
div.error-message {
    color: red;
}
</style>