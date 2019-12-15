<template>
    <div>
        <el-container>
            <el-aside width="250px">
            </el-aside>
            <el-main>
                <div style="background-color: white">
                    <div>
                        <mavon-editor
                                style="width: 975.2px"
                                class="md"
                                :value="value"
                                :subfield="false"
                                :defaultOpen="'preview'"
                                :toolbarsFlag="false"
                                :editable="false"
                                :scrollStyle="true"
                                :ishljs="true">
                        </mavon-editor>
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
                            <div>
<!--                                <div v-for="item in message">-->
<!--                                    <el-row style="margin: 15px">-->
<!--                                        <el-col :span="2">-->
<!--                                            <div style="color: #409EFF;padding: 5px;word-wrap : break-word ;margin-top: 3px"><span>{{item.reviewerName}}</span></div>-->
<!--                                        </el-col>-->
<!--                                        <el-col :span="18" style="background: #fbfbfb;border: 1px #eee solid;font-size: 15px;margin-bottom: 5px;border-radius: 5px">-->
<!--                                            <div class="shixin"></div>-->
<!--                                            <div class="kongxin"></div>-->
<!--                                            <div style="padding: 10px"><span >{{item.content}}<br/></span></div>-->
<!--                                            <span style="color: #bbb;font-size: 14px;margin-left: 10px">{{item.dateTime}}</span>-->
<!--                                        </el-col>-->
<!--                                    </el-row>-->
<!--                                </div>-->
                                <div style="text-align: center">
<!--                                    <el-pagination-->
<!--                                            @size-change="handleSizeChange"-->
<!--                                            @current-change="handleCurrentChange"-->
<!--                                            :current-page="currentPage"-->
<!--                                            :page-sizes="[5, 10, 20, 40]"-->
<!--                                            :page-size="pagesize"-->
<!--                                            layout="prev, pager, next"-->
<!--                                            :total="InitMessage.length">-->
<!--                                    </el-pagination>-->
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
                placeholder:'写点什么....',
                articleId:this.$route.params.articleId,
                value: '',
                InitMessage: [],
                message:[],
                currentPage:1,
                pagesize:5, //每页的评论数
            };
        },
        methods:{

            getDiscussion: function(){
                return new Promise(((resolve) => {
                        this.$req.post('/discussion/get_discussion',{
                            articleId: this.articleId,
                        })
                            .then(res=>{
                                this.InitMessage=res.data;
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
                    this.reviewer=sessionStorage.getItem('userNickname');
                    if (this.ruleForm.desc!==''){
                        this.$req.post('/comment/submit_comment',{
                            commentAreaId:this.commentAreaId,
                            content:this.ruleForm.desc,
                            reviewerName:this.reviewer
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
                            this.value=res.data.articleContent;
                        }
                    })
            }
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
    .form{
        padding: 12px 20px;
        background-color: #f7f7f7;
    }
</style>