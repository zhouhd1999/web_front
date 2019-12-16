<template>
    <div>
        <div style="margin-top: 20px" class="Python">
            <div class="top1">
                <span >Python</span>
                <el-button type="info" style="float: right;right: 30px;position: relative;bottom: 5px"><i class="el-icon-share"></i>分享</el-button>
            </div>
            <el-divider></el-divider>
            <div v-for="(item,index) in article" class="content">
                <div class="top">
                    <div style="font-size: 20px;position: relative;top: -18px;margin-left: 80px">
                        <el-button type="text" style="font-size: 20px" @click="open_article(item,index)">{{item.articleName}}</el-button>
                    </div>
                </div>
                <div class="mid">
                    <el-row>
                        <el-col :span="6"><img :src="hhh" style="height: 160px" /></el-col>
                        <el-col :span="18"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.articleDescribe}}<br/></span></div></el-col>
                    </el-row>
                </div>
                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                    <span style="margin-right: 60px"><i class="el-icon-user" style="margin-right: 10px"></i>{{userNickname}}</span>
                    <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.articleDateTime}}</span>
                    <img style="height: 15px;width: 15px;margin-right: 8px;margin-left: 30px" :src="aixin"/>
                    <span style="color: #f78585;" >{{item.articleLike}}个喜欢</span>
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
        name: "Python",
        data(){
            return{
                aixin:aixin,
                hhh:hhh,
                article:[],
                userNickname:sessionStorage.getItem('userNickname')
            }
        },
        methods:{
            ShowLogin:function(){
                this.outVisible=true;
            },
            open_article:function (item) {
                this.$router.push({
                    name:'Article',
                    params:{
                        articleId:item.articleId
                    }
                });
            },

            get_article:function () {
                this.$req.post('/article/get_article_by_tag_id', {
                    tagId: 3,
                })
                    .then(res => {
                        if (res.code === 0) {
                            this.article = res.data;
                        } else {
                            this.$message({
                                type: 'error',
                                message: '文章获取失败！'
                            });
                        }
                    })
            },

        },
        components: {
        },
        mounted(){

        },
        created() {
            this.get_article();
        }
    }
</script>

<style scoped>
    .Python{
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
        margin-top: 10px;
        position: relative;
        background-color: white;
        height: 200px;
        padding: 20px 15px 30px 20px;
    }
</style>