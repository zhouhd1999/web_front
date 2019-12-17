<template>
    <div >
        <div style="margin-top: -150px">
            <div v-for="(item,index) in article" class="content">
                <div class="top">
                    <div style="font-size: 20px;position: relative;top: -20px;margin-left: 80px">
                        <el-button type="text" style="font-size: 20px" @click="ShowArticle(index)">{{item.articleName}}</el-button>
                    </div>
                </div>

                <div class="mid">
                    <el-row>
                        <el-col :span="8"><img :src="hhh" style="height: 160px" /></el-col>
                        <el-col :span="16"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.articleDescribe}}<br/></span></div></el-col>
                    </el-row>
                </div>
                <div class="bottom">
                    <br>
                    <el-col >{{item.nickname}}</el-col>
                </div>
                <el-divider></el-divider>
                <div  v-show=item.isShow>
                <el-input

                        :readonly="true"
                        type="textarea"
                        :rows="12"
                        v-model="item.articleContent"
                >
                </el-input>
                    <el-button type="primary" style="float: right;margin: 5px" @click="delArticle(item)">删除</el-button>
                    <el-button type="primary" style="float: right;margin: 5px" @click="pasArticle(item)">通过</el-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import aixin from '@/assets/爱心.png'
    import hhh from '@/assets/img-3.png'
    export default {
        name: "ArticleManagement",
        data() {
            return {
                aixin: aixin,
                hhh: hhh,
                article: [
                ],
                userNickname: sessionStorage.getItem('userNickname')
            }
        },
        methods:{
            ShowArticle(index){
                 this.article[index].isShow=!this.article[index].isShow
                console.log(this.article[index].isShow)

            },
            get_article:function () {
                this.$req.post('/article/get_article_by_state',{
                    state:0
                })
                    .then(res => {
                        if (res.code === 0) {
                            console.log(res.data)
                            for (var i=0;i<res.data.length;i++){
                                this.article.push({
                                    articleName:'',
                                    nickname:'',
                                    articleContent:'',
                                    isShow:false
                                });
                            }
                            for(let i = 0; i < res.data.length;i++)
                              {
                                   this.article[i].articleName=res.data[i].article.articleName;
                                   this.article[i].articleDescribe=res.data[i].article.articleDescribe;
                                   this.article[i].nickname=res.data[i].nickname;
                                   this.article[i].articleContent=res.data[i].article.articleContent;
                              }
                            console.log("放进去的数组"+this.article)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '文章获取失败！'
                            });
                        }
                    })
            },
            delArticle(item){
                console.log(item.article.articleId)
                this.$req.post('/article/update_article_state',{
                    state:-1,
                    article:item.article.articleId
                })
                    .then(res =>{
                        if(res.code === 0){
                            this.get_article();
                            this.$message.success("已拒绝");
                        }
                        else{
                            this.$message({
                                type: 'error',
                                message: '文章获取失败！'
                            });
                        }
                    })
            },
            pasArticle(item){
                this.$req.post('/article/update_article_state',{
                    articleId:item.article.articleId
                })
                    .then(res =>{
                        if(res.code === 0){
                            this.get_article();
                            this.$message.success("已同意");
                        }
                        else{
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
        width: 1200px;
        margin-top:   150px;
        position: relative;
        background-color: white;

        padding: 50px 15px 60px 20px;
    }
</style>