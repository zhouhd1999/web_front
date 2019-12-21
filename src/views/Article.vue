<template>
    <div>
        <el-container>
            <el-aside width="250px">
                <div style="position: fixed;left: 115px;bottom: 60px">
                    <div class="left">
                        <el-tooltip class="item" effect="dark" content="返回首页" placement="left-start">
                            <el-button icon="el-icon-s-home" style="background-color:rgba(0,0,0,0);border: 0;font-size: 60px" circle @click="go_back('/')"></el-button>
                        </el-tooltip>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <div style="background-color: white">
                    <div class="top1">
                        <span >{{value.article.articleName}}</span>
                    </div>

                    <div class="bottom" style="font-size: 20px;color: #777;position: relative;top: 10px;margin-bottom: 25px">
                        <span style="position: relative;left: 40px">
                            作者：{{value.nickname}}
                        </span>
                        <span style="margin-right: 30px;float: right">
                            <i class="el-icon-time" style="margin-right: 10px"></i>{{value.article.articleDateTime}}
                        </span>

                    </div>
                    <div>
                        <mavon-editor
                                style="width: 975.2px"
                                class="md"
                                :value="value.article.articleContent"
                                :subfield="false"
                                :defaultOpen="'preview'"
                                :toolbarsFlag="false"
                                :editable="false"
                                :scrollStyle="true"
                                :ishljs="true">
                        </mavon-editor>
                    </div>
                    <div style="text-align: center">
                        <el-button size="text" style="margin-right: 40px" @click="like"><img :src="zan" style="height: 40px;width: 40px"></el-button>
                        <el-button size="text" style="margin-left: 40px" @click="hate"><img :src="cai" style="height: 40px;width: 40px"></el-button>
                    </div>
                    <div style="text-align: center;position: relative;bottom: 15px">
                        <span style="margin-right: 60px">{{value.article.articleLike}}</span>
                        <span style="margin-left: 60px">{{value.article.articleHate}}</span>
                    </div>
                    <div>
                        <div class="content">
                            <div class="form"><i class="el-icon-user"></i><span style="font-size: 16px;margin: 10px">发表我的评论</span></div>
                            <div style="margin-top: 20px">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="" prop="desc" style="width: 90%;text-align: center">
                                        <el-input type="textarea" v-model="ruleForm.desc" :rows="4" :placeholder=placeholder></el-input>
                                    </el-form-item>
                                    <el-form-item style="text-align: right;padding: 0 20px 10px 0;margin-right: 87px">
                                        <el-button type="primary"  @click="submitForm">提交评论</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div style="padding: 10px;color: #409EFF"><i class="el-icon-chat-line-round"></i><span style="font-size: 16px;margin: 5px">小伙伴们正在吐槽</span></div>
                            <el-divider class="el-divider1"></el-divider>
                            <div class="span">
                                <div v-for="item in message">
                                    <el-row style="margin: 15px">
                                        <el-col :span="2">
                                            <div style="color: #409EFF;padding: 5px;word-wrap : break-word ;margin-top: 3px"><span>{{item.nickName}}</span></div>
                                        </el-col>
                                        <el-col :span="18" style="background: #fbfbfb;border: 1px #eee solid;font-size: 15px;margin-bottom: 5px;border-radius: 5px">
                                            <div class="shixin"></div>
                                            <div class="kongxin"></div>
                                            <div style="padding: 10px"><span>{{item.discussion.discussionContent}}<br/></span></div>
                                            <span style="color: #bbb;font-size: 14px;margin-left: 10px">{{item.discussion.discussionDateTime}}</span>
<!--                                            <el-button size="text" style="float: right;padding: 0;margin-right: 15px;margin-top: 5px">回复</el-button>-->
<!--                                            <div class="huifu" >-->
<!--                                                <el-divider class="el-divider1"></el-divider>-->
<!--                                                <el-row>-->
<!--                                                    <el-col :span="2">-->
<!--                                                        <div style="color: #409EFF;padding: 5px;word-wrap : break-word ;margin-top: 3px;font-size: 12px"><span>{{item.userId}}</span></div>-->
<!--                                                    </el-col>-->
<!--                                                    <el-col :span="18" style="background: #fbfbfb;font-size: 12px;margin-bottom: 5px;border-radius: 5px">-->
<!--                                                        <div style="padding: 10px"><span>{{item.discussionContent}}<br/></span></div>-->
<!--                                                        <span style="color: #bbb;font-size: 14px;margin-left: 10px">{{item.discussionDateTime}}</span>-->
<!--                                                        <el-button size="text" style="float: right;padding: 0;margin-right: 15px;margin-top: 5px">回复</el-button>-->
<!--                                                    </el-col>-->
<!--                                                </el-row>-->
<!--                                            </div>-->
                                        </el-col>
                                    </el-row>
                                </div>
                                <div style="text-align: center">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[5, 10, 20, 40]"
                                            :page-size="pagesize"
                                            layout="prev, pager, next"
                                            :total="InitMessage.length">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
            <el-aside width="250px">
            </el-aside>
        </el-container>

    </div>
</template>

<script>
    import zan from '@/assets/赞.png'
    import cai from '@/assets/踩.png'

    export default {
        name: "Article",
        data() {
            return {
                ruleForm:{
                    desc:'',
                },
                rules: {
                    desc: [
                        { required: true, message: '请填写内容', trigger: 'blur' }
                    ]
                },
                zan:zan,
                cai:cai,
                placeholder:'写点什么....',
                articleId:this.$route.params.articleId,
                value: '',
                InitMessage: [],
                message:[],
                currentPage:1,
                attitude:'',
                pagesize:5, //每页的评论数
            };
        },
        methods:{

            go_back:function(index) {
                this.$router.push(index);
            },

            //分页
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                this.handleUserList();
            },
            handleUserList() {
                this.message = this.InitMessage.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
            },

            like:function(){
                if (sessionStorage.length===0){
                    this.$message({
                        type: 'error',
                        message:'请先登录'
                    });
                }else{
                    this.$req.post('/attitude/get_attitude',{
                        userId:sessionStorage.getItem('userId'),
                        articleId:this.articleId
                    })
                        .then(res=>{
                            if (res.code===0){
                                this.attitude=res.data.userAttitude;
                                console.log(this.attitude)
                                if (this.attitude===1){
                                    this.$message({
                                        type: 'error',
                                        message:'已赞过'
                                    });
                                }
                                if (this.attitude===0){
                                    this.$req.post('/attitude/click_attitude',{
                                        userId:sessionStorage.getItem('userId'),
                                        articleId:this.articleId,
                                        currentAttitude:0,
                                        futureAttitude:1
                                    })
                                        .then(res1=>{
                                            if (res1.code===0){
                                                this.value.article.articleLike+=1;
                                                this.$message({
                                                    type: 'success',
                                                    message:'点赞成功'
                                                });
                                            }else{
                                                this.$message({
                                                    type: 'error',
                                                    message:'点赞失败'
                                                });
                                            }
                                        })
                                }
                                if (this.attitude===-1){
                                    this.$req.post('/attitude/click_attitude',{
                                        userId:sessionStorage.getItem('userId'),
                                        articleId:this.articleId,
                                        currentAttitude:-1,
                                        futureAttitude:1
                                    })
                                        .then(res1=>{
                                            console.log(res1);
                                            if (res1.code===0){
                                                this.value.article.articleHate-=1;
                                                this.value.article.articleLike+=1;
                                                this.$message({
                                                    type: 'success',
                                                    message:'点赞成功'
                                                });
                                            }else{
                                                this.$message({
                                                    type: 'error',
                                                    message:'点赞失败'
                                                });
                                            }
                                        })
                                }
                            }else{
                                this.$message({
                                    type: 'error',
                                    message:'系统异常'
                                });
                            }
                        })

                }

            },

            hate:function(){
                if (sessionStorage.length===0){
                    this.$message({
                        type: 'error',
                        message:'请先登录'
                    });
                }else{
                    this.$req.post('/attitude/get_attitude',{
                        userId:sessionStorage.getItem('userId'),
                        articleId:this.articleId
                    })
                        .then(res=>{
                            if (res.code===0){
                                this.attitude=res.data.userAttitude;
                                console.log(this.attitude)
                                if (this.attitude===-1){
                                    this.$message({
                                        type: 'error',
                                        message:'已踩'
                                    });
                                }
                                else if (this.attitude===0){
                                    this.$req.post('/attitude/click_attitude',{
                                        userId:sessionStorage.getItem('userId'),
                                        articleId:this.articleId,
                                        currentAttitude:0,
                                        futureAttitude:-1
                                    })
                                        .then(res1=>{
                                            if (res1.code===0){
                                                this.value.article.articleHate+=1;
                                                this.$message({
                                                    type: 'success',
                                                    message:'反对成功'
                                                });
                                            }else{
                                                this.$message({

                                                    type: 'error',
                                                    message:'反对失败'
                                                });
                                            }
                                        })
                                }
                                else if (this.attitude===1){
                                    this.$req.post('/attitude/click_attitude',{
                                        userId:sessionStorage.getItem('userId'),
                                        articleId:this.articleId,
                                        currentAttitude:1,
                                        futureAttitude:-1
                                    })
                                        .then(res2=>{
                                            if (res2.code===0){
                                                this.value.article.articleHate+=1;
                                                this.value.article.articleLike-=1;
                                                this.$message({
                                                    type: 'success',
                                                    message:'反对成功'
                                                });
                                            }else{
                                                this.$message({
                                                    type: 'error',
                                                    message:'反对失败'
                                                });
                                            }
                                        })
                                }
                            }else{
                                this.$message({
                                    type: 'error',
                                    message:'系统异常'
                                });
                            }
                        })

                }

            },

            getDiscussion: function(){
                return new Promise(((resolve) => {
                        this.$req.post('/discussion/get_discussion',{
                            articleId: this.articleId,
                        })
                            .then(res=>{
                                let arr=[];
                                res.data.forEach(function (c) {
                                    if (c.discussion.replayId===0){
                                        arr.push(c)
                                    }
                                })

                                this.InitMessage=arr;
                                console.log(this.InitMessage)
                                resolve()
                            })
                    }
                ))
            },

            submitForm() {
                if (sessionStorage.length===0){
                    this.$message({
                        type: 'warning',
                        message:'请登录'
                    });
                }
                else{
                    if (this.ruleForm.desc!==''){
                        this.$req.post('/discussion/submit_discussion',{
                            userId:sessionStorage.getItem('userId'),
                            articleId:this.articleId,
                            discussionContent:this.ruleForm.desc,
                            replayId:0,
                            replayUserId:0
                        })
                            .then(res=>{
                                if (res.code===0){
                                    this.$message({
                                        type: 'info',
                                        message:'发表成功'
                                    });
                                    this.ruleForm.desc='';
                                    this.getDiscussion().then(res=>{
                                        this.handleUserList();
                                    })
                                }
                            })
                    }else{
                        this.$message({
                            type: 'error',
                            message:'请填写内容'
                        });
                    }
                }
            },

            handleUserList() {
                this.message = this.InitMessage.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
            },

            getArticle(){
                this.$req.post('/article/get_article_by_article_id',{
                    articleId:this.articleId
                })
                    .then(res=>{
                        if (res.code===0){
                            this.value=res.data;
                        }
                    })
            },
        },
        created() {
            this.getArticle();
            this.getDiscussion().then(res=>{
                this.handleUserList();
            });

        }
    }
</script>

<style scoped>
   .span span {
        display: inline-block;
        line-height: 20px;
        padding: 5px 0;
        margin-right: 10px;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }
    .kongxin{
        width:0;
        height:0;
        border:10px solid transparent;
        border-right-color:#fbfbfb;
        position: absolute;
        top: 16px;
        left:60px;
    }
    .shixin{
        width:0;
        height:0;
        border:10px solid transparent;
        border-right-color:#eee;
        position: absolute;
        top: 16px;
        left:59px;
    }

    .el-divider1{
        margin: 6px 0 6px 0;
    }
    .leavemessage{
        min-height: 600px;
        background-color: white;
    }
    .top{
        height: 40px;
        font-size: 20px;
        position: relative;
        left: 20px;
        top: 20px;
    }
    .form{
        padding: 12px 20px;
        background-color: #f7f7f7;
    }


    .top1{
        height: 80px;
        font-size: 40px;
        font-weight: 500;
        position: relative;
        left: 20px;
        top: 20px;
    }
</style>