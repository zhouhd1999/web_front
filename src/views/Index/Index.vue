<template>
    <div class="index">
        <div>
            <el-row>
                <el-col :span="24">
                    <el-carousel :interval="3000" arrow="always" height="300px" type="card">
                        <el-carousel-item v-for="item in imageBox" :key="item.id">
                            <div class="el-carousel__item">
                                <img style="width: 100%; height: 100%;" :src="item.idView">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </div>
        <div class="rank">
            <div style="padding: 10px;font-size: 20px"><span>热门排行</span></div>
            <el-divider class="el-divider1"></el-divider>
            <ul v-for="(item,index) in hotRanking" :key="index">
                <li><label :class="'label'+index">{{index+1}}</label>
                    <el-button type="text" @click="open_article2(item,index)">{{item.articleName}}</el-button>
                    <div style="float: right;font-size: 15px;margin-right: 15px" @click="hot_like(item,index)">
                        <el-button type="text" style="color: #f78585;font-size: 14px;margin-right: -90px">{{item.articleLike}}个喜欢</el-button>
                        <img style="height: 15px;width: 15px;margin-right: 88px" :src="aixin"/>
                    </div>
                </li>
            </ul>
        </div>
        <div style="margin-top: 20px" >
            <div v-for="(item,index) in data" class="content">
                <div class="top">
                    <img :src="tubiao" style="height: 20px;width: 20px" />
                    <el-button type="text" style="color: black;margin-left: 8px;font-size: 16px;position: relative;top: -2px" @click="goto(item.article.tagId)">{{item.tagName}}</el-button>
                    <div style="font-size: 20px;position: relative;top: -45px;margin-left: 180px">
                        <el-button type="text" style="font-size: 20px;position: relative;bottom: 6px" @click="open_article(item,index)">{{item.article.articleName}}</el-button>
                    </div>
                </div>
                <div class="mid">
                    <el-row>
                        <el-col :span="6"><img :src="require('@/assets/article_img/'+item.article.articlePreviewImg)" style="height: 160px" /></el-col>
                        <el-col :span="18"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.article.articleDescribe| ellipsis}}<br/></span></div></el-col>
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
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'
    import aixin from '@/assets/爱心.png'
    import tubiao from '@/assets/标签.png'
    import hhh from '@/assets/img-3.png'
    export default {

        name: 'Index',
        data(){
            return{
                data:[],
                aixin:aixin,
                tubiao:tubiao,
                imageBox:[{id:0,idView:require("../../assets/11.jpg")},
                    {id:1,idView:require("../../assets/img-2.png")},
                    {id:2,idView:require("../../assets/img-3.png")}
                ],
                hotRanking:[],
                article:[]
            }
        },
        filters: {
            ellipsis (value) {
                if (!value) return ''
                if (value.length > 200) {
                    return value.slice(0,200) + '...'
                }
                return value
            },
        },
        methods:{
            goto:function(tag_id){
                if (tag_id===74){
                    this.$router.push('/Body/Other');
                }
                if (tag_id===70){
                    this.$router.push('/Body/Java');
                }
                if (tag_id===71){
                    this.$router.push('/Body/C');
                }
                if (tag_id===104){
                    this.$router.push('/Body/PersonShow');
                }
                if (tag_id===73){
                    this.$router.push('/Body/Python');
                }
                if (tag_id===68){
                    this.$router.push('/Body/PersonDiary');
                }
                if (tag_id===72){
                    this.$router.push('/Body/PHP');
                }
            },

            open_article:function (item) {
                this.$router.push({
                    name:'Article',
                    params:{
                        articleId:item.article.articleId
                    }
                });
            },

            open_article2:function (item) {
                this.$router.push({
                    name:'Article',
                    params:{
                        articleId:item.articleId
                    }
                });
            },

            hot_like:function (item,index){
                if(sessionStorage.length===0){
                    this.$message({
                        type: 'error',
                        message:'请先登录'
                    });
                }else{
                    this.$req.post('/attitude/get_attitude',{
                        userId:sessionStorage.getItem('userId'),
                        articleId:item.articleId
                    })
                        .then(res1=>{
                            let currentAttitude=res1.data.userAttitude;

                            if (currentAttitude===1){
                                this.$message({
                                    type: 'error',
                                    message:'已喜欢'
                                });
                            }
                            //更新
                            else{
                                this.$req.post('/attitude/click_attitude',{
                                    userId:sessionStorage.getItem('userId'),
                                    articleId:item.articleId,
                                    currentAttitude:currentAttitude,
                                    futureAttitude:1
                                })
                                    .then(res=>{
                                        if (res.code===0){
                                            this.$message({
                                                type: 'success',
                                                message:'喜欢成功'
                                            });
                                            this.hotRanking[index].articleLike+=1;
                                        }else{
                                            this.$message({
                                                type: 'error',
                                                message:'喜欢失败'
                                            });
                                        }
                                    })
                            }

                            // if (currentAttitude===0){
                            //     this.$req.post('/article/like_article',{
                            //         articleId:item.articleId
                            //     })
                            //         .then(res=>{
                            //             if (res.code===0){
                            //                 this.$message({
                            //                     type: 'success',
                            //                     message:'喜欢成功'
                            //                 });
                            //                 this.hotRanking[index].articleLike+=1;
                            //             }else{
                            //                 this.$message({
                            //                     type: 'error',
                            //                     message:'系统异常'
                            //                 });
                            //             }
                            //         })
                            // } else{
                            //     this.$message({
                            //         type: 'error',
                            //         message:'已喜欢'
                            //     });
                            // }
                        })
                }
            },

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
                           if (currentAttitude===1){
                               this.$message({
                                   type: 'error',
                                   message:'已喜欢'
                               });
                           }
                           else{
                               this.$req.post('/attitude/click_attitude',{
                                   userId:sessionStorage.getItem('userId'),
                                   articleId:item.article.articleId,
                                   currentAttitude:currentAttitude,
                                   futureAttitude:1
                               })
                                   .then(res=>{
                                       if (res.code===0){
                                           this.$message({
                                               type: 'success',
                                               message:'喜欢成功'
                                           });
                                           this.data[index].article.articleLike+=1;
                                       }else{
                                           this.$message({
                                               type: 'error',
                                               message:'喜欢失败'
                                           });
                                       }
                                   })
                           }

                           // if (currentAttitude===0){
                           //     this.$req.post('/article/like_article',{
                           //         articleId:item.article.articleId
                           //     })
                           //         .then(res=>{
                           //             if (res.code===0){
                           //                 this.$message({
                           //                     type: 'success',
                           //                     message:'喜欢成功'
                           //                 });
                           //                 this.data[index].article.articleLike+=1;
                           //             }else{
                           //                 this.$message({
                           //                     type: 'error',
                           //                     message:'系统异常'
                           //                 });
                           //             }
                           //         })
                           // } else{
                           //     this.$message({
                           //         type: 'error',
                           //         message:'已喜欢'
                           //     });
                           // }


                       })

               }
            },

            get_hot_article:function () {
                this.$req.post('/article/get_article_by_like')
                    .then(res=>{
                        if(res.code===0){
                            this.hotRanking=res.data;
                        }else{
                            this.$message({
                                type: 'error',
                                message:'热门文章获取失败！'
                            });
                        }
                    })
            },

            get_article:function () {
                this.$req.post('/article/get_article')
                    .then(res=>{
                        if(res.code===0){
                            let arr=[];
                            res.data.forEach(function (c) {
                                if (c.article.articleState===1){
                                    arr.push(c)
                                }
                            })
                            this.data=arr;
                            console.log(this.data)
                        }else{
                            this.$message({
                                type: 'error',
                                message:'文章获取失败！'
                            });
                        }
                    })
            }
        },
        components: {
        },
        mounted(){

        },
        created() {
            this.get_hot_article();
            this.get_article();
        }

    }
</script>

<style scoped>

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
    .label0{
        background-color: #fd8c84;
    }
    .label1{
        background-color: #6fc299;
    }
    .label2{
        background-color: #81c1f2;
    }
    .label3{
        background-color: #999;
    }
    .label4{
        background-color: #999;
    }
    .el-divider1{
        margin: 6px 0 6px 0;
    }
    .el-carousel__item {
    }

    .index{
        /*background-color: white;*/
        width: 100%;
        min-height: 600px;
    }

    .rank{
        background-color: white;
        font-size: 20px;
        position: relative;
        top: 10px;
    }

    .content{
        margin-top: 10px;
        position: relative;
        background-color: white;
        height: 200px;
        padding: 20px 15px 30px 20px;
    }
</style>