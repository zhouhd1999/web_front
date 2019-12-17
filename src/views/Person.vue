<template>
    <div>
        <el-container>
            <el-aside width="250px">
            </el-aside>
            <el-main class="el_main_body">
                <el-tabs :tab-position="'left'" style="height: 100%" @tab-click="getInfo">
                    <el-tab-pane label="个人资料" style="height: 480px">
                        <div style="padding: 0 32px 30px">
                            <div style="font-size: 20px">
                                <h3>个人资料</h3>
                            </div>
                            <el-divider></el-divider>
                            <div>
                                <el-row>
                                    <el-col :span="4">
                                        <div style="margin-left: 10px">

                                            <el-upload
                                                    class="upload-demo"
                                                    action="http://127.0.0.1:8081/information/update_head"
                                                    :data="upData"
                                                    :show-file-list="false"
                                                    :before-upload="beforeAvatarUpload"
                                                    :on-success="handleAvatarSuccess">
                                                <el-avatar :size="100" :src="circleUrl"></el-avatar>
<!--                                                <el-button type="text" style="margin-left: 20px">修改头像</el-button>-->
                                                <div slot="tip" class="el-upload__tip">只能上传jpg文件</div>
                                            </el-upload>
                                        </div>
                                    </el-col>
                                    <el-col :span="16">
                                        <div style="font-size: 14px;color: #4d4d4d">
                                            <span>ID：</span><span>{{ID}}</span><br/><br/>
                                            <span>昵称：</span><span>{{nickname}}</span><br/><br/>
                                            <span>年龄：</span><span>{{age}}</span><br/><br/>
                                            <span>电话号码：</span><span>{{tell}}</span><br/><br/>
                                            <span>职业：</span><span>{{profession}}</span><br/><br/>
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
                    <el-tab-pane label="我的文章">
                        <div style="padding: 0 32px 30px;min-height: 450px">
                            <div style="font-size: 20px">
                                <h3>我的文章</h3>
                            </div>
                            <el-button style="float: right;position: relative;top: -60px" @click="new_article">新建文章</el-button>
                            <el-divider></el-divider>
                            <div v-for="(item,index) in my_article" class="content">
                                    <div class="top" >
                                        <img :src="tubiao" style="height: 20px;width: 20px" />
                                        <span style="margin-left: 8px;font-size: 16px;position: relative;top: -2px">{{item.tagName}}</span>
                                        <div style="font-size: 20px;position: relative;top: -36px;margin-left: 180px">
                                            <el-button type="text" style="font-size: 20px" @click="open_article(item,index)">{{item.article.articleName}}</el-button>
                                            <span v-if="(item.article.articleState===1)" style="position: relative;float: right">
                                            <img :src="shenhezhong" style="width: 80px;height: 80px">
                                        </span>
                                            <span v-if="(item.article.articleState===0)" style="position: relative;float: right">
                                            <img :src="shenhetongguo" style="width: 80px;height: 80px">
                                        </span>
                                            <span v-if="(item.article.articleState===-1)" style="position: relative;float: right">
                                            <img :src="shenheshibai" style="width: 80px;height: 80px">
                                        </span>
                                        </div>
                                    </div>
                                    <div class="mid">
                                        <el-row>
                                            <el-col :span="7"><img :src="hhh" style="height: 160px" /></el-col>
                                            <el-col :span="17">
                                                <div style="padding: 10px;position: relative;bottom: 80px">
                                                <span style="word-break: break-all;color: #777">
                                                    {{item.article.articleDescribe}}<br/>
                                                </span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="bottom" style="float: right;font-size: 14px;color: #777">
                                        <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.article.articleDateTime}}</span>
                                        <img style="height: 15px;width: 15px;margin-right: 8px;margin-left: 30px" :src="aixin"/>
                                        <span style="color: #f78585;">{{item.article.articleLike}}个喜欢</span>

                                    </div>
                                    <el-divider></el-divider>
                            </div>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的喜欢">
                        <div style="padding: 0 32px 30px;min-height: 450px">
                            <div style="font-size: 20px">
                                <h3>我的喜欢</h3>
                            </div>
                            <el-divider></el-divider>
                            <div v-for="(item,index) in my_love_article" class="content">
                                <div class="top">
                                    <img :src="tubiao" style="height: 20px;width: 20px" />
                                    <span style="margin-left: 8px;font-size: 16px;position: relative;top: -2px">{{item.tagName}}</span>
                                    <div style="font-size: 20px;position: relative;top: -36px;margin-left: 180px">
                                        <el-button type="text" style="font-size: 20px" @click="open_article(item,index)">{{item.article.articleName}}</el-button>
                                    </div>
                                </div>
                                <div class="mid">
                                    <el-row>
                                        <el-col :span="7"><img :src="hhh" style="height: 160px" /></el-col>
                                        <el-col :span="17"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.article.articleDescribe}}<br/></span></div></el-col>
                                    </el-row>
                                </div>
                                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                                    <span style="margin-right: 60px"><i class="el-icon-user" style="margin-right: 10px"></i>{{item.nickname}}</span>
                                    <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.article.articleDateTime}}</span>

                                </div>
                                <el-divider></el-divider>
                            </div>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的云盘" style="height: 503px" >
                        <div style="padding: 0 32px 30px">
                            <div style="font-size: 20px">
                                <h3>我的网盘</h3>
                            </div>
                            <el-divider></el-divider>
                            <el-button type="small" @click="new_file">新建文件夹</el-button>
                            <el-button type="small" icon="el-icon-delete" @click="delete_file">删除</el-button>
                            <el-button size="small" style="float: right" icon="el-icon-download" @click="downLoad">下载</el-button>

                            <a :href="'http://127.0.0.1:8081/cloud/download?name='+fileName" id="downLoad" v-show="false"> 下载文件 </a>
                            <el-upload

                                    style="float: right"
                                    action="http://127.0.0.1:8081/cloud/uploadFile"
                                    :limit="99"
                                    :show-file-list="false"
                                    :before-upload="before_upload"
                                    :on-success="submit_file_success">
                                <el-button size="small"  icon="el-icon-upload2" >上传</el-button>
                            </el-upload>

                            <div class="block">
                                <el-tree
                                        :data="data"
                                        node-key="id"
                                        draggable
                                        ref="tree"
                                        highlight-current
                                        :default-expand-all="false"
                                        :check-on-click-node="true"
                                        :expand-on-click-node="false"
                                        @node-click="handleNodeClick">
                                  <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>{{ node.label }}</span>
                                  </span>
                                </el-tree>
                            </div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="草稿箱">
                        <div style="padding: 0 32px 30px;min-height: 450px">
                            <div style="font-size: 20px">
                                <h3>草稿箱</h3>
                            </div>
                            <el-divider></el-divider>
                            <div v-for="(item,index) in drafts" class="content">
                                <div class="top" >
                                    <img :src="tubiao" style="height: 20px;width: 20px" />
                                    <span style="margin-left: 8px;font-size: 16px;position: relative;top: -2px">{{item.tagName}}</span>
                                    <div style="font-size: 20px;position: relative;top: -36px;margin-left: 180px">
                                        <el-button type="text" style="font-size: 20px" @click="exit_article(item,index)">{{item.article.articleName}}</el-button>
                                    </div>
                                </div>
                                <div class="mid">
                                    <el-row>
                                        <el-col :span="7"><img :src="hhh" style="height: 160px" /></el-col>
                                        <el-col :span="17">
                                            <div style="padding: 10px">
                                                <span style="word-break: break-all;color: #777;position: relative;bottom: 10px">
                                                    {{item.article.articleDescribe}}<br/>
                                                </span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                                    <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.article.articleDateTime}}</span>
                                </div>
                                <el-divider></el-divider>
                            </div>

                        </div>
                    </el-tab-pane>
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
                <el-form-item label="昵称" prop="nickname">
                    <el-input type="text" v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm.age" ></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="number">
                    <el-input v-model.number="ruleForm.number" ></el-input>
                </el-form-item>
                <el-form-item label="职业" prop="profession">
                    <el-input v-model.number="ruleForm.profession" ></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 165px">
                    <el-button type="info" @click="theVisible=false">取消</el-button>
                    <el-button type="primary" @click="submit_info('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    let id = 1;
    import aixin from '@/assets/爱心.png'
    import tubiao from '@/assets/标签.png'
    import hhh from '@/assets/img-3.png'
    import shenhezhong from '@/assets/审核中.png'
    import shenhetongguo from '@/assets/审核通过.png'
    import shenheshibai from '@/assets/审核失败.png'

    export default {
        name: "Person",
        data() {
            let checkNickName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('昵称不得为空'));
                } else {
                    callback();
                }
            };
            let checkNumber = (rule, value, callback) => {
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
            return {
                data: [{label:"我的网盘", id:1,children: []}],
                ruleForm: {
                    nickname: '',
                    age: '',
                    number: '',
                    profession: "",
                    introduction: ''
                },
                rules: {
                    nickname: [
                        {validator: checkNickName, trigger: 'blur'}
                    ],
                    number: [
                        {validator: checkNumber, trigger: 'blur'}
                    ],
                },
                shenhezhong:shenhezhong,
                shenhetongguo:shenhetongguo,
                shenheshibai:shenheshibai,
                aixin: aixin,
                tubiao: tubiao,
                hhh: hhh,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                theVisible: false,
                ID: "",
                nickname: "",
                age: "",
                fileName:'',
                file: '',
                tell: "",
                node: '',
                node_data: '',
                profession: "",
                introduction: "",
                my_article: [],
                my_love_article:[],
                drafts:[],
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.$message.success('上传成功');
                this.circleUrl=require('@/assets/image/'+file.name);
                sessionStorage.setItem('circleUrl',this.circleUrl);
                console.log(this.circleUrl)
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG&&!isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            open_article:function (item) {
                this.$router.push({
                    name:'Article',
                    params:{
                        articleId:item.article.articleId
                    }
                });
            },

            exit_article:function (item) {
                this.$router.push({
                    name:'Article_edit',
                    params:{
                        articleId:item.article.articleId
                    }
                });
            },

            //树形控件
            new_file: function () {
                if(this.node_data ==''||this.node ==''){
                    this.$message({
                        type: 'error',
                        message:'请先选择新建文件夹的路径！'
                    });
                }else if (this.node.data.children===undefined){
                    this.$message({
                        type: 'error',
                        message:'此目录不允许新建！'
                    });
                }
                else{
                    this.append(this.node_data);
                }

            },
            delete_file: function () {
                if (this.node_data.id === 1) {
                    this.$message({
                        type: 'error',
                        message: '根目录禁止删除!'
                    });
                } else {
                    if(this.node_data ===''||this.node===''){
                        this.$message({
                            type: 'error',
                            message:'请先选择新建文件夹的路径！'
                        });
                    }
                    else{
                        this.remove(this.node, this.node_data);
                    }
                }
            },
            handleNodeClick(data, node) {
                this.fileName=node.data.label;
                this.node_data = data;
                this.node = node;
            },
            //新建文件夹
            append(data) {
                //console.log(data);
                this.$prompt('请输入文件名', '新建文件夹', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: '',
                }).then(({value}) => {
                    this.$message({
                        type: 'success',
                        message: '新建文件夹成功!'
                    });
                    const newChild = {id: id++, label: value, children: []};
                    if (!data.children) {
                        this.$set(data, 'children', []);
                    }
                    data.children.push(newChild);
                    //console.log(data);
                    this.updateCloudInfo();
                })
            },
            remove(node, data) {
                //console.log(node, data);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);
                    this.updateCloudInfo();
                })
            },

            updateCloudInfo: function () {
                let content = JSON.stringify(this.data);
                this.$req.post('/cloud/save_directory', {
                    dirContent: content,
                    directoryId: sessionStorage.getItem('userId'),
                    countId:id,
                })
                    .then(res => {
                        if (res.code === 0) {

                        }
                    })
            },

            getInfo: function (tab) {
                if (tab.label == "我的云盘") {
                    this.$req.post('/cloud/get_directory', {
                        userId: sessionStorage.getItem('userId')
                    })
                        .then(res => {
                            //console.log(res);
                            if (res.code === 0) {
                                this.data = JSON.parse(res.data.directoryContent);
                                //console.log(this.data);
                                id=res.data.countId;
                            } else {

                            }
                        })
                }

                if (tab.label == "我的喜欢") {
                    this.$req.post('/article/get_like_article',{
                        userId:sessionStorage.getItem('userId')
                    })
                        .then(res=>{
                            if (res.code===0){
                                this.my_love_article=res.data;
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '我的喜欢获取失败！'
                                });
                            }
                        })
                }

                if (tab.label == "我的文章") {
                    let arr=[];
                    this.$req.post('/article/get_articleByUserId',{
                        userId:sessionStorage.getItem('userId')
                    })
                        .then(res=>{
                            if (res.code===0){
                                res.data.forEach(function (c) {
                                    if (c.article.articleState<=1&&c.article.articleState>=-1){
                                        arr.push(c)
                                    }
                                })
                                this.my_article=arr;
                            }
                            else{
                                this.$message({
                                    type: 'error',
                                    message: '我的文章获取失败！'
                                });
                            }
                        })
                }
                if (tab.label =="草稿箱"){
                    let arr=[];
                    this.$req.post('/article/get_articleByUserId',{
                        userId:sessionStorage.getItem('userId')
                    })
                        .then(res=>{
                            if (res.code===0){
                                res.data.forEach(function (c) {
                                    if (c.article.articleState===2){
                                        arr.push(c)
                                    }
                                })
                                this.drafts=arr;
                            }
                            else{
                                this.$message({
                                    type: 'error',
                                    message: '我的文章获取失败！'
                                });
                            }
                        })
                }

            },

            submit_file_success:function(){

                const newChild={id:id++, label: this.fileName,};
                //console.log(id);
                this.node.data.children.push(newChild);
                this.updateCloudInfo();
                this.$message({
                    type: 'success',
                    message:'提交成功！'
                });
            },

            before_upload:function(file){
                //console.log(this.node);
                this.fileName=file.name;
                if(this.node_data ===''||this.node===''){
                    this.$message({
                        type: 'error',
                        message:'请先选择上传路径！'
                    });
                    return false;
                }else if (this.node.data.children===undefined){
                    this.$message({
                        type: 'error',
                        message:'此目录不允许上传文件！'
                    });
                    return false;
                }
            },


            downLoad:function(){
                if(this.node.data.children!==undefined){
                    this.$message({
                        type: 'error',
                        message:'文件夹不允许下载！'
                    });
                }else{
                    document.getElementById("downLoad").click();
                }
                // this.$req.get('/cloud/download',{
                //     name:this.node.data.label
                // },
                //     {responseType:'arraybuffer'})
                //     .then(res=>{
                //         let blob = new Blob([res.data], {
                //             //type: 'application/vnd.ms-excel'
                //         });
                //         let objectUrl = URL.createObjectURL(blob);
                //         window.location.href = objectUrl;
                //         // console.log(blob)
                //         // let fileName = this.node.data.label
                //         // if (window.navigator.msSaveOrOpenBlob) {
                //         //     // console.log(2)
                //         //     navigator.msSaveBlob(blob, fileName)
                //         // } else {
                //         //     // console.log(3)
                //         //     var link = document.createElement('a')
                //         //     link.href = window.URL.createObjectURL(blob)
                //         //     link.download = fileName
                //         //     link.click()
                //         //     //释放内存
                //         //     window.URL.revokeObjectURL(link.href)
                //         //}
                //         })


            },

            submit_info:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        this.$req.post('/information/update_information',{
                            userId:sessionStorage.getItem('userId'),
                            //userId:sessionStorage.getItem('userId'),
                            //nickname:this.ruleForm.nickname,
                            infoAge:this.ruleForm.age,
                            infoPhoneNumber:this.ruleForm.number,
                            infoProfession:this.ruleForm.profession,
                            infoIntroduction:this.ruleForm.introduction
                        })
                            .then(res=>{
                                if (res.code===0) {
                                    this.$req.post('/user/update_user',{
                                        userId:sessionStorage.getItem('userId'),
                                        userNickname:this.ruleForm.nickname,
                                    })
                                        .then(ret=>{
                                            if (ret.code===0){
                                                this.$message({
                                                    type: 'success',
                                                    message:'修改成功！'
                                                });
                                                this.theVisible=false;
                                                this.getUserMessage();
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
                this.$req.post('/information/get_information_by_user_id',{
                    userId:sessionStorage.getItem('userId'),
                })
                    .then(res=>{
                        if (res.code===0){
                            this.ID=sessionStorage.getItem('userAccount');
                            this.nickname=sessionStorage.getItem('userNickname');
                            this.age=res.data.infoAge;
                            this.tell=parseInt(res.data.infoPhoneNumber);
                            this.profession=res.data.infoProfession;
                            this.introduction=res.data.infoIntroduction;

                            this.circleUrl=require('@/assets/image/'+res.data.infoHeadUrl);

                            this.ruleForm.nickname=this.nickname;
                            this.ruleForm.age=this.age;
                            this.ruleForm.number=this.tell;
                            this.ruleForm.profession=this.profession;
                            this.ruleForm.introduction=this.introduction
                        }else{
                            this.$message({
                                type: 'error',
                                message:'个人信息获取失败'
                            });
                        }
                    })
            },

            new_article:function () {
                this.$router.push('/Article_edit');
            }
        },
        computed:{
            idPlaceholder:function () {
                return this.ID+"                  ID是唯一标识，不可修改！";
            },
            upData:function(){
                return {
                    userId: 2
                }
            },
        },
        created() {
            this.getUserMessage();
        }

    }
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .el_main_body{
        margin-top: 20px;
        background-color: white;
        width: 1019.2px;
        margin-bottom: 20px;
    }
    .top{
        height: 40px;

    }
    .content{
        margin-top: 10px;
        position: relative;
        background-color: white;
        height: 200px;
        padding: 20px 15px 30px 20px;
    }
</style>