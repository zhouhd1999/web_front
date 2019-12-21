<template>
    <div>
<!--            <el-aside width="200px"></el-aside>-->
<!--            <el-container>-->
<!--                <el-row class="tac">-->
<!--                    <el-col :span="6">-->
<!--                        <el-menu-->
<!--                                default-active="2"-->
<!--                                class="el-menu-vertical-demo"-->
<!--                                @open="handleOpen"-->
<!--                                @close="handleClose">-->
<!--                            <el-submenu index="1">-->
<!--                                <template slot="title">-->
<!--                                <i class="el-icon-location"></i>-->
<!--                                <span>博主服务</span>-->
<!--                                </template>-->
<!--                                <el-menu-item-group>-->
<!--                                    <el-menu-item index="1-1">用户管理</el-menu-item>-->
<!--                                    <el-menu-item index="1-2">文章管理</el-menu-item>-->
<!--                                    <el-menu-item index="1-3">标签管理</el-menu-item>-->
<!--                                </el-menu-item-group>-->

<!--                            </el-submenu>-->

<!--                            <el-submenu index="2">-->
<!--                                <template slot="title">-->
<!--                                <i class="el-icon-menu"></i>-->
<!--                                <span slot="title">用户服务</span>-->
<!--                                </template>-->
<!--                                <el-menu-item-group>-->
<!--                                    <el-menu-item index="2-1">投稿管理</el-menu-item>-->
<!--                                    <el-menu-item index="1-2">权限管理</el-menu-item>-->
<!--                                </el-menu-item-group>-->
<!--                            </el-submenu>-->
<!--                        </el-menu>-->
<!--                    </el-col>-->
<!--                    <el-col>-->

<!--                    </el-col>-->
<!--                </el-row>-->

<!--            </el-container>-->
        <el-container style="height: 100%">
            <el-aside width="200px" style="min-height: 600px;background-color: white">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>博主服务</template>
                        <el-menu-item-group>
                            <el-menu-item  @click="goTo('/Background/UserController')">用户管理</el-menu-item>

                             <el-menu-item @click="goTo('/Background/TagManagement')"   >标签管理</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>文章服务</template>
                        <el-menu-item-group>
                            <el-menu-item  @click="goTo('/Background/Contribution')" >投稿审核</el-menu-item>
                            <el-menu-item  @click="goTo('/Background/ArticleManagement')" >文章管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[]
            }
        },
        methods:{
            goTo: function (index) {
                this.$router.push(index);
            },
        }
    };
</script>
<style>

</style>