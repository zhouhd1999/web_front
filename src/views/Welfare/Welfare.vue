<template>
    <div>

        <div style="margin-top: 20px" class="welfare">
            <div class="top1">
                <span >福利专区</span>
                <el-button type="info" style="float: right;right: 30px;position: relative;bottom: 5px"><i class="el-icon-share"></i>分享</el-button>
            </div>
            <el-divider></el-divider>
            <div v-for="(item,index) in article" class="content">
                <div class="top">
                    <div style="font-size: 20px;position: relative;top: 5px;margin-left: 40px;color: #71829e">
<!--                        <el-button type="text" style="font-size: 20px" @click="open_article(item,index)">{{item.name}}</el-button>-->
                        <span style="cursor: pointer" @click="See(item.source)">{{item.name}}</span>
                    </div>
                </div>
                <div class="mid">
                    <el-row>
                        <el-col :span="6"><img :src="hhh" style="height: 160px" /></el-col>
                        <el-col :span="18"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.describe}}<br/></span></div></el-col>
                    </el-row>
                </div>
                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                    <div  @click="time_like(item,index)" style="float: right">
                        <el-button type="text" style="color: #f78585;margin-right: -80px;position: relative;bottom: 8px">{{item.articleLike}}个喜欢</el-button>
                        <img style="height: 15px;width: 15px;margin-right:80px;position: relative;bottom: 6px" :src="aixin"/>
                    </div>
                </div>
                <el-divider></el-divider>
            </div>
        </div>
    </div>
</template>

<script>
    import aixin from '@/assets/爱心.png'
    import hhh from '@/assets/img-3.png'
    export default {
        name: "PersonalShow",
        data(){
            return{
                aixin:aixin,
                hhh:hhh,
                article:[
                    {
                        describe:"我画了 20 张图，给女朋友讲清楚红黑树",
                        name:"武老板教女朋友",
                        artists:"武拯宇",
                        source:'https://zhuanlan.zhihu.com/p/95892351',
                        articleLike:11
                    },
                    {
                        name:"武老板手把手教学数学",
                        artists:"武拯宇",
                        source:"https://zhuanlan.zhihu.com/p/96063757",
                        articleLike:12
                    }
                ],
                userNickname:sessionStorage.getItem('userNickname')
            }
        },
        methods:{
            See (e) {
                window.location.href = e
            }
        },
    }
</script>

<style scoped>

    .welfare{
        background-color: white;
    }

    .top1{
        height: 40px;
        font-size: 20px;
        font-weight: 500;
        position: relative;
        left: 20px;
        top: 20px;
    }
    .top{
        height: 40px;

    }
    ul{
        list-style: none;
        margin: 2px;
    }
    label{
        margin-right: 8px;
        padding: 2px 10px;
        top: -1px;
        font-size: 14px;
    }

    .content{
        margin-top: 2px;
        position: relative;
        background-color: white;
        height: 200px;
        padding: 0px 15px 30px 20px;
    }
</style>