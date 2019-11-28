<template>
    <div>
        <el-container>
            <el-aside width="250px"></el-aside>
            <el-container style="padding: 0" class="nav-main">
                <el-header style="width: 1019.2px">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
                        <el-menu-item index="1" @click="choose('/')">首页</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">生活笔记</template>
                            <el-menu-item index="2-1" @click="choose('/Body/PersonalEssay')">个人随笔</el-menu-item>
                            <el-menu-item index="2-2" @click="choose('/Body/PersonalDiary')">个人日记</el-menu-item>
                            <el-menu-item index="2-3" @click="choose('/Body/PersonalShow')">个人展示</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">技术杂谈</template>
                            <el-menu-item index="3-1" @click="choose('/Body/Java')">Java</el-menu-item>
                            <el-menu-item index="3-2" @click="choose('/Body/C')">C/C++</el-menu-item>
                            <el-menu-item index="3-3" @click="choose('/Body/Python')">Python</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="4">福利专区</el-menu-item>
                        <el-menu-item index="5">关于博主</el-menu-item>
                        <el-menu-item index="6" @click="choose('/Body/LeaveMessage')">给我留言</el-menu-item>
                        <el-menu-item index="7" @click="choose('/Body/Sponsorship')">赞助作者</el-menu-item>
                        <el-menu-item index="8">技术交流</el-menu-item>
                        <el-menu-item index="9">项目合作</el-menu-item>
                    </el-menu>
                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
            <el-aside width="250px"></el-aside>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "Body",
        data(){
            return{
                activeIndex: '1',
            };
        },
        methods:{
            choose: function (index) {
                this.$router.push(index);
            },
        }
    }
</script>

<style scoped>

</style>