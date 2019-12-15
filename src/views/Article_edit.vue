<template>
    <div>
        <el-container>
            <el-aside width="250px">
            </el-aside>
            <el-main>
                <div style="background-color: white">
                    <div class="top">
                        <span>新建文章</span>
                    </div>
                    <el-divider ></el-divider>
                    <div>
                        <div style="padding: 0 10px 10px 10px">
                            <el-input placeholder="请输入标题" v-model="title" clearable>
                                <template slot="prepend">文章标题：</template>
                            </el-input>
                        </div>
                        <div style="padding: 0 10px 10px 10px">
                            <el-input placeholder="请输入描述" v-model="describe" clearable>
                                <template slot="prepend">简单描述：</template>
                            </el-input>
                        </div>
                        <div style="padding: 0 10px 20px 10px">
                            <el-tag class="tag_class">选择标签：</el-tag>
                            <el-radio-group v-model="radio" v-for="item in data">
                                <el-radio :label=item.tagId style="margin-left: 20px">{{item.tagName}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <mavon-editor v-model="value" style="height: 600px" @save="submit_article"/>
                    <div style="padding: 20px;text-align: center">
                        <el-button type="primary" @click="submit_article">提交</el-button>
                        <el-button type="info">保存</el-button>
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
                title:'',
                describe:'',
                value:'',
                radio:'',
                data:'',
            };
        },
        methods:{
            get_tag:function(){
                  this.$req.post('/tag/get_all_tag')
                      .then(res=>{
                          if (res.code===0){
                              this.data=res.data;
                          }
                      })
            },

            submit_article:function(){
                if (this.radio===''||this.title===''||this.describe===''||this.value===''){
                    this.$message({
                        type: 'info',
                        message:'请先完善信息!'
                    });
                }else{
                    if (sessionStorage.getItem('userPermission')==='1'){
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
                                articleState:1
                            })
                                .then(res=>{
                                    if (res.code===0){
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
                        this.$confirm('点击确定后将提交到管理员出审核, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(() => {
                            this.$req.post('/article/insert_article',{
                                userId:sessionStorage.getItem('userId'),
                                tagId:this.radio,
                                articleContent:this.value,
                                articleName:this.title,
                                articleDescribe:this.describe,
                                articleState:2
                            })
                                .then(res=>{
                                    if (res.code===0){
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

                }

            },

            handleClose(done) {
                done();
            },
        },
        created() {
            this.get_tag();
        },
        watch:{
            // title:function () {
            //     this.value='# '+this.title;
            // }
        }
    }
</script>

<style scoped>
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