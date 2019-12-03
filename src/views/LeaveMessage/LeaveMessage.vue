<template>
    <div class="leavemessage">
        <div class="top">
            <span>给我留言</span>
            <el-button type="info" style="float: right;right: 30px;position: relative;bottom: 5px;"><i class="el-icon-share"></i>分享</el-button>
        </div>
        <el-divider ></el-divider>
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
                <div v-for="item in message">
                    <el-row style="margin: 15px">
                        <el-col :span="2">
                            <div style="color: #409EFF;padding: 5px;word-wrap : break-word ;margin-top: 3px"><span>{{item.reviewerName}}</span></div>
                        </el-col>
                        <el-col :span="18" style="background: #fbfbfb;border: 1px #eee solid;font-size: 15px;margin-bottom: 5px;border-radius: 5px">
                            <div class="shixin"></div>
                            <div class="kongxin"></div>
                            <div style="padding: 10px"><span >{{item.content}}<br/></span></div>
                            <span style="color: #bbb;font-size: 14px;margin-left: 10px">{{item.dateTime}}</span>
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
</template>

<script>
    import alipay from '@/assets/alipay.jpg'

    export default {
        name: "LeaveMessage",
        data(){
            return{
                currentPage:1,
                pagesize:5, //每页的评论数
                alipay:alipay,
                commentAreaId:1,
                reviewer:'',
                placeholder:'写点什么....',
                ruleForm:{
                    desc:'',
                },
                rules: {
                    desc: [
                        { required: true, message: '请填写内容', trigger: 'blur' }
                    ]
                },
                InitMessage: [],
                message:[],
            };
        },
        methods:{

            //先new了一个promise对象 ，把请求放在里面，调成功后，resolve() 理解为 return出去，调用时就可以用 .then()来处理异步问题
            getComment: function(){
                return new Promise(((resolve) => {
                        this.$req.post('/comment/getComment',{
                            commentAreaId: this.commentAreaId,
                        })
                            .then(res=>{
                                this.InitMessage=eval(res.data).data;
                                resolve()
                            })
                    }
                ))
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


            //提交评论
            submitForm() {
                if (sessionStorage.length===0){
                    this.$message({
                        type: 'warning',
                        message:'请登录'
                    });
                }
                else{
                    this.reviewer=sessionStorage.getItem('nickname');
                    if (this.ruleForm.desc!==''){
                        this.$req.post('/comment/submitComment',{
                            commentAreaId:this.commentAreaId,
                            content:this.ruleForm.desc,
                            reviewerName:this.reviewer
                        })
                            .then(res=>{
                                if (eval(res.data).code===0){
                                    this.$message({
                                        type: 'info',
                                        message:'发表成功'
                                    });
                                    this.ruleForm.desc='';
                                    this.getComment().then(res=>{
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
        },
        created() {
            this.getComment().then(res=>{
                this.handleUserList();
            });

        },
        beforeCreate() {

        }
    }
</script>

<style scoped>
    el-button{

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
</style>