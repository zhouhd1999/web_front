<template>
    <div>
        <el-container>
            <el-aside width="280px">
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
                    <div class="top">
                        <span>新建文章</span>
                    </div>
                    <el-divider ></el-divider>
                    <div>
                        <div style="padding: 0 10px 10px 10px">
                            <el-input placeholder="请输入标题" v-model="title" clearable style="width: 520px">
                                <template slot="prepend">文章标题：</template>
                            </el-input>
                        </div>
                        <div style="padding: 0 10px 10px 10px">
                            <el-input placeholder="请输入描述" v-model="describe" clearable style="width: 520px;position: relative;top: 10px">
                                <template slot="prepend">简单描述：</template>
                            </el-input>
                        </div>
                        <div style="padding: 0 10px 20px 10px;position: relative;top: 20px">
                            <el-tag class="tag_class">选择标签：</el-tag>
                            <el-radio-group v-model="radio" v-for="item in tag">
                                <el-radio :label=item.tagId style="margin-left: 20px">{{item.tagName}}</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="right">
                            <el-tooltip class="item" effect="dark" content="选择预览图片" placement="right-start">
                                <el-upload
                                        class="avatar-uploader"
                                        action="http://127.0.0.1:8081/article/insert_article_preview_img"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-tooltip>
                        </div>

                    </div>
                    <mavon-editor v-model="value" style="height: 600px" @save="submit_article" :toolbars='toolbars'></mavon-editor>
                    <div style="padding: 20px;text-align: center">
                        <el-button type="primary" @click="submit_article">提交</el-button>
                        <el-button type="info" @click="save_article">保存</el-button>
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
        name: "Article_edit",
        data(){
            return{
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: false, // 展示html源码
                    help: false, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    //save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true // 预览
                },
                imageUrl: '',
                title:'',
                describe:'',
                value:'',
                radio:'',
                tag:[],
                file_name:'',
                articleId:this.$route.params.articleId,
                flag:1
            };
        },
        methods:{
            go_back:function(index) {
                this.$router.push(index);
            },

            handleAvatarSuccess(res, file) {
                this.file_name=file.name;
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            get_tag:function(){
                let arr=[];
              this.$req.post('/tag/get_all_tag')
                  .then(res=>{
                      if (res.code===0){
                          res.data.forEach(function (c) {
                              if (c.tagType===1)
                                  arr.push(c);
                          })
                          this.tag=arr;
                      }
                  })
            },

            submit_article:function(){
                if (this.radio===''||this.title===''||this.describe===''||this.value===''||this.imageUrl===''){
                    this.$message({
                        type: 'info',
                        message:'请先完善信息!'
                    });
                }else{
                    if (this.flag===1){
                        if (sessionStorage.getItem('userPermission')==='0'){
                            this.$confirm('确认提交?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                            }).then(() => {
                                this.$req.post('/article/insert_article',{
                                    userId:sessionStorage.getItem('userId'),
                                    tagId:this.radio,
                                    articleContent:this.value,
                                    articleName:this.title,
                                    articleDescribe:this.describe,
                                    articleState:1,
                                    articlePreviewImg:this.file_name
                                })
                                    .then(res=>{
                                        if (res.code===0){
                                            this.radio='';
                                            this.value='';
                                            this.title='';
                                            this.describe='';
                                            this.imageUrl='';
                                            this.$message({
                                                type: 'success',
                                                message:'提交成功!'
                                            });
                                        }else{
                                            this.$message({
                                                type: 'error',
                                                message:'提交失败，请稍后重试!'
                                            });
                                        }
                                    })
                            });
                        }
                        else{
                            this.$confirm('点击确定后将提交到管理员处审核, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                            }).then(() => {
                                this.$req.post('/article/insert_article',{
                                    userId:sessionStorage.getItem('userId'),
                                    tagId:this.radio,
                                    articleContent:this.value,
                                    articleName:this.title,
                                    articleDescribe:this.describe,
                                    articleState:0,
                                    articlePreviewImg:this.file_name
                                })
                                    .then(res=>{
                                        if (res.code===0){
                                            this.radio='';
                                            this.value='';
                                            this.title='';
                                            this.describe='';
                                            this.imageUrl='';
                                            this.$message({
                                                type: 'info',
                                                message:'已提交到管理员处审核，请耐心等待!'
                                            });
                                        }else{
                                            this.$message({
                                                type: 'error',
                                                message:'提交失败，请稍后重试!'
                                            });
                                        }
                                    })
                            });
                        }
                    }else{
                        this.$req.post('/article/update_article',{
                            userId:sessionStorage.getItem('userId'),
                            articleId:this.articleId,
                            tagId:this.radio,
                            articleContent:this.value,
                            articleName:this.title,
                            articleDescribe:this.describe,
                            articleState:0,
                            articlePreviewImg:this.file_name
                        })
                            .then(res=>{
                                if (res.code===0){
                                    this.radio='';
                                    this.value='';
                                    this.title='';
                                    this.describe='';
                                    this.imageUrl='';
                                    this.$message({
                                        type: 'success',
                                        message:'已提交到管理员处审核，请耐心等待!'
                                    });
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message:'提交失败，请稍后重试!'
                                    });
                                }
                            })
                    }

                }

            },

            save_article:function(){
                if (this.flag===1){
                    this.$req.post('/article/insert_article',{
                        userId:sessionStorage.getItem('userId'),
                        tagId:this.radio,
                        articleContent:this.value,
                        articleName:this.title,
                        articleDescribe:this.describe,
                        articleState:2,
                        articlePreviewImg:this.file_name
                    })
                        .then(res=>{
                            if (res.code===0){
                                this.radio='';
                                this.value='';
                                this.title='';
                                this.describe='';
                                this.imageUrl='';
                                this.$message({
                                    type: 'success',
                                    message:'保存成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message:'保存失败，请稍后重试!'
                                });
                            }
                        })
                }else{
                    this.$req.post('/article/update_article',{
                        userId:sessionStorage.getItem('userId'),
                        tagId:this.radio,
                        articleContent:this.value,
                        articleId:this.articleId,
                        articleName:this.title,
                        articleDescribe:this.describe,
                        articleState:2,
                        articlePreviewImg:this.file_name
                    })
                        .then(res=>{
                            if (res.code===0){
                                this.radio='';
                                this.value='';
                                this.title='';
                                this.describe='';
                                this.imageUrl='';
                                this.$message({
                                    type: 'success',
                                    message:'保存成功!'
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message:'保存失败，请稍后重试!'
                                });
                            }
                        })
                }
            },

            handleClose(done) {
                done();
            },

            getArticle(){
                this.$req.post('/article/get_article_by_article_id',{
                    articleId:this.articleId
                })
                    .then(res=>{
                        if (res.code===0){

                            this.value=res.data.article.articleContent;
                            this.title=res.data.article.articleName;
                            this.describe=res.data.article.articleDescribe;
                            this.radio=res.data.article.tagId;
                            this.imageUrl=require('@/assets/article_img/'+res.data.article.articlePreviewImg);
                            this.file_name=res.data.article.articlePreviewImg
                        }
                    })
            }
        },
        created() {
            this.get_tag();
            if (this.articleId!==undefined){
                this.getArticle();
                this.flag=0;
            }
        },
        watch:{
            // title:function () {
            //     this.value='# '+this.title;
            // }
        },
        computed:{

        }
    }
</script>

<style scoped>

    .avatar-uploader {
        margin-left: 590px;
        margin-bottom: -150px;
        bottom: 160px;
        width: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .top{
        height: 40px;
        font-size: 20px;
        position: relative;
        left: 20px;
        top: 20px;
    }

    .tag_class{
        padding: 4px 20px;
        background-color: #F5F7FA;
        font-size: 14px;
        color: #909399;
        border: 1px solid #DCDFE6;
        height: 39.6px;
    }
</style>