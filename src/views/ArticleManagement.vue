<template>
    <div>
        <el-button @click="showArtileType()" autofocus="true">生活笔记</el-button>
        <el-button @click="showArtileType_1()">技术杂谈</el-button>
        <div style="margin-top: -130px; height: 200px;">
            <el-collapse-transition>
                <div>
                    <div v-show="show3" v-for="(item,index) in article" class="content">
                        <div class="top">
                            <div style="font-size: 20px;position: relative;top: -20px;margin-left: 80px">
                                <el-button type="text" style="font-size: 20px" @click="ShowArticle(index)">
                                    {{item.articleName}}
                                </el-button>
                            </div>
                        </div>

                        <div class="mid">
                            <el-row>
                                <el-col :span="8"><img style="height: 160px"/></el-col>
                                <el-col :span="16">
                                    <div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.articleDescribe}}<br/></span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="bottom">
                            <br>
                            <el-col>{{item.nickname}}</el-col>
                        </div>
                        <el-divider></el-divider>
                        <div v-show=item.isShow >
                            <el-input
                                    :readonly=item.isEdits
                                    type="textarea"
                                    :rows="12"
                                    v-model="item.articleContent">
                            </el-input>
                            <div style="margin: 15px;float: right;">
                                <el-button type="primary" @click="isEdit(item,index)">{{editShow}}</el-button>
                                <el-button type="danger" @click="delArticle(item,index)">删除</el-button>


                            </div>
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
        editShow:"编辑",
        article: [],
        articles:[],
    }
    },
        methods:{

            isEdit(item,index){
                if(this.editShow == "编辑"){
                    this.editShow = "完成";
                    console.log(this.article[index].isEdits)
                    this.article[index].isEdits = false;
                }
                else if(this.editShow =="完成"){
                    this.editShow = "编辑";
                    this.article[index].isEdits = true;
                    console.log(item)
                    this.articles[index].article.articleContent = item.articleContent;
                    var data = this.articles[index].article;
                    this.$req.post('/article/update_article',data)
                    .then(res => {
                        if (res.code === 0) {
                            this.$message.success("修改完成");
                        }
                        else{
                            this.$message({
                                type: 'error',
                                message: '文章获取失败！'
                            });
                        }
                    })
                }
            },
            showArtileType(){
              //this.show3=!this.show3;
              this.get_article(0);
            },

            showArtileType_1(){
               // this.show3=!this.show3
                this.get_article(1);
            },


            ShowArticle(index){
                this.article[index].isShow=!this.article[index].isShow;
                console.log(this.article[index].isShow)

            },
            get_article:function (sta) {
                this.article=[];
                this.articles = [];
                var data={
                    state:sta
                }
                this.$req.post('/article/get_article_by_state',data)
                    .then(res => {
                        if (res.code === 0) {
                            this.articles = res.data;
                            console.log(res.data)
                            for (var i=0;i<res.data.length;i++){
                                this.article.push({
                                    articleName:'',
                                    nickname:'',
                                    articleContent:'',
                                    isShow:false,
                                    isEdits:true,
                                });
                            }
                            for(let i = 0; i < res.data.length;i++)
                            {
                                this.article[i].articleName=res.data[i].article.articleName;
                                this.article[i].articleDescribe=res.data[i].article.articleDescribe;
                                this.article[i].nickname=res.data[i].nickname;
                                this.article[i].articleContent=res.data[i].article.articleContent;
                            }

                        } else {
                            this.$message({
                                type: 'error',
                                message: '文章获取失败！'
                            });
                        }
                    })
            },
            delArticle(item,index){
                console.log(item)
                this.$req.post('/article/update_article_state',{
                    state:-1,
                    article:this.articles[index].article.articleId
                })
                    .then(res =>{
                        if(res.code === 0){
                            this.get_article();
                            this.$message.success("已删除");
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