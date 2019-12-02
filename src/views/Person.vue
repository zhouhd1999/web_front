<template>
    <div>
        <el-container>
            <el-aside width="250px">
            </el-aside>
            <el-main class="el_main_body">
                <el-tabs :tab-position="'left'" style="height: 600px;">
                    <el-tab-pane label="个人资料">
                        <div style="padding: 0 32px 30px">
                            <div style="font-size: 20px">
                                <h3>个人资料</h3>
                            </div>
                            <el-divider></el-divider>
                            <div>
                                <el-row>
                                    <el-col :span="4">
                                        <div style="margin-left: 10px">
                                            <el-avatar :size="100" :src="circleUrl"></el-avatar>
                                            <el-upload
                                                    class="upload-demo"
                                                    :action=url
                                                    :on-preview="handlePreview"
                                                    :on-remove="handleRemove"
                                                    list-type="picture">
                                                <el-button type="text" style="margin-left: 20px">修改头像</el-button>
                                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                            </el-upload>
                                        </div>
                                    </el-col>
                                    <el-col :span="16">
                                        <div style="font-size: 14px;color: #4d4d4d">
                                            <span>ID：</span><span>{{ID}}</span><br/><br/>
                                            <span>昵称：</span><span>{{nickName}}</span><br/><br/>
                                            <span>电话号码：</span><span>{{tell}}</span><br/><br/>
                                            <span>简介：</span><span>{{introduction}}</span><br/><br/>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="text" style="float: right;position: relative;top: -10px" @click="theVisible=true">修改资料</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的文章">我的文章</el-tab-pane>
                    <el-tab-pane label="我的喜欢">我的喜欢</el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>


<!--        修改个人资料-->
        <el-dialog
                width="30%"
                title="修改资料"
                :visible.sync="theVisible"
                :close-on-click-modal="false"
                append-to-body>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID">
                    <el-input type="text" :placeholder=idPlaceholder :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input type="text" v-model="ruleForm.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="age">
                    <el-input v-model.number="ruleForm.age" ></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 165px">
                    <el-button type="info" @click="theVisible=false">取消</el-button>
                    <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Person",
        data(){
            let checkNickName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('昵称不得为空'));
                }else {
                    callback();
                }
            };
            let checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('号码不能为空'));
                }
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
                        callback(new Error('请输入正确格式的手机号'));
                    } else {
                        callback();
                    }
                }
            };
            return{
                url:"D:\\Web",
                //fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                ruleForm: {
                    nickName:'',
                    age:[],
                    introduction:''
                },
                rules: {
                    nickName:[
                        { validator: checkNickName, trigger:'blur'}
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                },
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                theVisible:false,
                ID:"",
                nickName: "",
                tell:"",
                introduction:"",

            };
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            submit:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        this.$req.post('/user/updateUser',{
                            userId:sessionStorage.getItem('user'),
                            nickName:this.ruleForm.nickName,
                            tell:this.ruleForm.age,
                            introduction:this.ruleForm.introduction
                        })
                            .then(res=>{
                               if (eval(res.data).code===0) {
                                   this.$message({
                                       type: 'success',
                                       message:'修改成功！'
                                   });
                                   this.theVisible=false;
                               }else{
                                   this.$message({
                                       type: 'error',
                                       message:'修改失败！'
                                   });
                               }
                            })
                    }else{
                        this.$message({
                            type: 'error',
                            message:'请先完善信息'
                        });
                    }
                });
            },
            getUserMessage(){
                this.$req.post('/user/getUserMessage',{
                    userId:sessionStorage.getItem('user'),
                })
                    .then(res=>{
                        if (eval(res.data).code===0){
                            this.ID=sessionStorage.getItem('user');
                            this.nickName=eval(res.data).data.nickName;
                            this.tell=eval(res.data).data.tell;
                            this.introduction=eval(res.data).data.introduction;
                            this.ruleForm.nickName=eval(res.data).data.nickName;
                            this.ruleForm.age=parseInt(eval(res.data).data.tell);
                            this.ruleForm.introduction=eval(res.data).data.introduction;
                        }else{
                            this.$message({
                                type: 'error',
                                message:'个人信息获取失败'
                            });
                        }
                    })
            }
        },
        computed:{
            idPlaceholder:function () {
                return this.ID+"                          ID是唯一标识，不可修改！";
            }
        },
        created() {
            this.getUserMessage();
        }

    }
</script>

<style scoped>
    .el_main_body{
        margin-top: 20px;
        background-color: white;
        width: 1019.2px;
        margin-bottom: 20px;
    }
</style>