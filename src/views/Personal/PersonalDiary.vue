<template>
    <div>
        <div style="margin-top: 20px" class="C">
            <div class="top1">
                <span >个人日记</span>
                <el-button type="info" style="float: right;right: 30px;position: relative;bottom: 5px"><i class="el-icon-share"></i>分享</el-button>
            </div>
            <el-divider></el-divider>

            <div style="margin-top: 20px;min-height:400px" >
                <div v-for="(item,index) in data" class="content">
                    <div class="top">
                        <div style="font-size: 20px;position: relative;top: -25px;margin-left: 40px">
                            <el-button type="text" style="font-size: 20px" @click="open_article(item,index)">{{item.article.articleName}}</el-button>
                        </div>
                    </div>
                    <div class="mid">
                        <el-row>
                            <el-col :span="6"><img :src="require('@/assets/article_img/'+item.article.articlePreviewImg)" style="height: 160px" /></el-col>
                            <el-col :span="18"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.article.articleDescribe}}<br/></span></div></el-col>
                        </el-row>
                    </div>
                    <div class="bottom" style="float: right;font-size: 14px;color: #777">
                        <span style="margin-right: 60px"><i class="el-icon-user" style="margin-right: 10px"></i>{{item.nickname}}</span>
                        <span style="margin-right: 70px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.article.articleDateTime}}</span>

                        <div  @click="time_like(item,index)" style="float: right">
                            <el-button type="text" style="color: #f78585;margin-right: -80px;position: relative;bottom: 8px">{{item.article.articleLike}}个喜欢</el-button>
                            <img style="height: 15px;width: 15px;margin-right:80px;position: relative;bottom: 6px" :src="aixin"/>
                        </div>

                    </div>
                    <el-divider></el-divider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import aixin from '@/assets/爱心.png'
    import hhh from '@/assets/img-3.png'
    import tubiao from '@/assets/标签.png'
    export default {
        name: "PHP",
        data() {
            return {
                data:[],
                tubiao:tubiao,
                aixin: aixin,
                hhh: hhh,
                article: [],
                userNickname: sessionStorage.getItem('userNickname')
            }
        },
        methods:{
            time_like:function (item,index){
                if (sessionStorage.length===0){
                    this.$message({
                        type: 'error',
                        message:'请先登录'
                    });
                }else{
                    this.$req.post('/attitude/get_attitude',{
                        userId:sessionStorage.getItem('userId'),
                        articleId:item.article.articleId
                    })
                        .then(res1=>{
                            let currentAttitude=res1.data.userAttitude;
                            if (res1.code===0){
                                this.$req.post('/attitude/click_attitude',{
                                    userId:sessionStorage.getItem('userId'),
                                    articleId:item.article.articleId,
                                    currentAttitude:currentAttitude,
                                    futureAttitude:1
                                })
                            }

                            if (currentAttitude===0){
                                this.$req.post('/article/like_article',{
                                    articleId:item.article.articleId
                                })
                                    .then(res=>{
                                        if (res.code===0){
                                            this.$message({
                                                type: 'success',
                                                message:'喜欢成功'
                                            });
                                            console.log(this.data[index])
                                            this.data[index].article.articleLike+=1;
                                        }else{
                                            this.$message({
                                                type: 'error',
                                                message:'系统异常'
                                            });
                                        }
                                    })
                            } else{
                                this.$message({
                                    type: 'error',
                                    message:'已喜欢'
                                });
                            }


                        })

                }
            },
            ShowLogin:function(){
                this.outVisible=true;
            },
            open_article:function (item) {
                console.log(item);
                this.$router.push({
                    name:'Article',
                    params:{
                        articleId:item.article.articleId
                    }
                });
            },

            get_article:function () {
                this.$req.post('/article/get_article_by_tag_id', {
                    tagId: 68,
                })
                    .then(res => {
                        if (res.code === 0) {
                            let arr=[];
                            res.data.forEach(function (c) {
                                if (c.article.articleState===1){
                                    arr.push(c)
                                }
                            })
                            this.data = arr;
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
    .C{
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