<template>
    <div>
        <el-button @click="showArtileType()" autofocus="true">生活笔记</el-button>
        <el-button @click="showArtileType_1()">技术杂谈</el-button>
        <div style="margin-top: -130px; height: 200px;">
            <el-collapse-transition>
                <div>
                    <div  v-show="show3" v-for="(item,index) in article"class="content">
                        <div class="top">
                            <div style="font-size: 20px;position: relative;top: -20px;margin-left: 80px">
                                <el-button type="text" style="font-size: 20px" @click="ShowArticle(index)">{{item.articleName}}</el-button>
                            </div>
                        </div>

                        <div class="mid">
                            <el-row>
                                <el-col :span="8"><img style="height: 160px" /></el-col>
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
                                    v-model="item.articleContent">
                            </el-input>
                </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
        return{
        show3: true,
        article: []
    }
    },
        methods:{

            showArtileType(){
              this.show3=!this.show3;

            },

            showArtileType_1(){
                this.show3=!this.show3
            },


            ShowArticle(index){
                this.article[index].isShow=!this.article[index].isShow;
                console.log(this.article[index].isShow)

            },
            get_article:function (sta) {
                this.article=[];
                var data={
                    state:sta
                }
                this.$req.post('/article/get_article_by_state',data)
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
            this.get_article(0);
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