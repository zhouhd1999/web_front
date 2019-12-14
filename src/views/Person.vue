<template>
    <div>
        <el-container>
            <el-aside width="250px">
            </el-aside>
            <el-main class="el_main_body">
                <el-tabs :tab-position="'left'" style="height: 100%" @tab-click="getCloudInfo">
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
                                            <el-avatar :size="100" :src="circleUrl"></el-avatar>
<!--                                            <el-upload-->
<!--                                                    class="upload-demo"-->
<!--                                                    :action=url-->
<!--                                                    :on-preview="handlePreview"-->
<!--                                                    :on-remove="handleRemove"-->
<!--                                                    list-type="picture">-->
<!--                                                <el-button type="text" style="margin-left: 20px">修改头像</el-button>-->
<!--                                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                                            </el-upload>-->
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
                        <div style="padding: 0 32px 30px">
                            <div style="font-size: 20px">
                                <h3>我的文章</h3>
                            </div>
                            <el-button style="float: right;position: relative;top: -60px" @click="new_article">新建文章</el-button>
                            <el-divider></el-divider>
                            <div v-for="(item,index) in article" class="content">
                                <div class="top">
                                    <img :src="tubiao" style="height: 20px;width: 20px" />
                                    <span style="margin-left: 8px;font-size: 16px;position: relative;top: -2px">{{item.tag}}</span>
                                    <div style="font-size: 20px;position: relative;top: -36px;margin-left: 180px">
                                        <el-button type="text" style="font-size: 20px">{{item.title}}</el-button>
                                    </div>
                                </div>
                                <div class="mid">
                                    <el-row>
                                        <el-col :span="7"><img :src="hhh" style="height: 160px" /></el-col>
                                        <el-col :span="17"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.introduction}}<br/></span></div></el-col>
                                    </el-row>
                                </div>
                                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                                    <span style="margin-right: 60px"><i class="el-icon-user" style="margin-right: 10px"></i>{{item.author}}</span>
                                    <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.date}}</span>
                                    <img style="height: 15px;width: 15px;margin-right: 8px;margin-left: 30px" :src="aixin"/>
                                    <span style="color: #f78585;">{{item.like}}个喜欢</span>

                                </div>
                                <el-divider></el-divider>
                            </div>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我的喜欢">
                        <div style="padding: 0 32px 30px">
                            <div style="font-size: 20px">
                                <h3>我的喜欢</h3>
                            </div>
                            <el-divider></el-divider>
                            <div v-for="(item,index) in article" class="content">
                                <div class="top">
                                    <img :src="tubiao" style="height: 20px;width: 20px" />
                                    <span style="margin-left: 8px;font-size: 16px;position: relative;top: -2px">{{item.tag}}</span>
                                    <div style="font-size: 20px;position: relative;top: -36px;margin-left: 180px">
                                        <el-button type="text" style="font-size: 20px">{{item.title}}</el-button>
                                    </div>
                                </div>
                                <div class="mid">
                                    <el-row>
                                        <el-col :span="7"><img :src="hhh" style="height: 160px" /></el-col>
                                        <el-col :span="17"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.introduction}}<br/></span></div></el-col>
                                    </el-row>
                                </div>
                                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                                    <span style="margin-right: 60px"><i class="el-icon-user" style="margin-right: 10px"></i>{{item.author}}</span>
                                    <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.date}}</span>
                                    <img style="height: 15px;width: 15px;margin-right: 8px;margin-left: 30px" :src="aixin"/>
                                    <span style="color: #f78585;">{{item.like}}个喜欢</span>

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
                            <el-button size="small" style="float: right" icon="el-icon-download">下载</el-button>
                            <el-upload
                                    style="float: right"
                                    action="http://127.0.0.1:8081/cloud/uploadFile"
                                    :limit="99"
                                    :show-file-list="false"
                                    :before-upload="before_upload"
                                    :on-success="submit_file_success">
                                <el-button size="small"  icon="el-icon-upload2">上传</el-button>
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
    let id = 100;
    import aixin from '@/assets/爱心.png'
    import tubiao from '@/assets/标签.png'
    import hhh from '@/assets/img-3.png'

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
                data: [],
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
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

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
                article: [{
                    tag: 'Python',
                    title: 'sklearn贝叶斯分类器的案例',
                    img: '123',
                    introduction: '贝叶斯分类器的原理比较简单，可以自己去百度了解原理，这篇文章就是讲一讲贝叶斯分类器的实际应用案例。案例：研究期末考试前一周的行为（假设有三种：1.打游戏 2.逛街 3.学习）对于期末开考试的影响（就是是否挂科）。首先要有一个样本库，没办法，只能自己去创建了，我们就按照这个形式来创建样本库，形...',
                    date: '2019/11/29',
                    author: '123',
                    link: '132323132',
                    like: 5
                },
                    {
                        tag: 'Java',
                        title: 'Java世界最常用的工具类库',
                        img: '123',
                        introduction: 'jdk1.8之前，日期操作类常用的只有java.util.Date和java.util.Calendar，但是这2个类的易用性实在太差了，SimpleDateFormat不是线程安全的 。这就逼迫用户去选择第三方的日期操作类，Joda Time就是其中的佼佼者。后来Java自身也意识到了这个问题，于是jdk1.8大量借鉴了Joda Time的理念，推出了新的日期api，...',
                        date: '2019/11/29',
                        author: '123',
                        link: '132323132',
                        like: 5
                    },
                    {
                        tag: 'Python',
                        title: '23qwewqeqweqwqweqweqwweqweqweqwqwe123',
                        img: '123',
                        troduction: '5464643qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee33333eeeee6456465',
                        date: '2019/11/29',
                        author: '123',
                        link: '132323132',
                        like: 5
                    },
                    {
                        tag: 'C',
                        title: '231qweqweqewweq23',
                        img: '123',
                        introduction: '5464646456465',
                        date: '2019/11/29',
                        author: '123',
                        link: '132323132',
                        like: 5
                    },
                    {
                        tag: 'Python',
                        title: '23123',
                        img: '123',
                        introduction: '5464646456465',
                        date: '2019/11/29',
                        author: '123',
                        link: '132323132',
                        like: 5
                    }]

            };
        },
        methods: {

            //树形控件
            new_file: function () {
                if(this.node_data ==''||this.node==''){
                    this.$message({
                        type: 'error',
                        message:'请先选择新建文件夹的路径！'
                    });
                }else if (this.node.children=='undefine'){

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
                    if(this.node_data ==''||this.node==''){
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
                this.node_data = data;
                this.node = node;
            },
            append(data) {
                console.log(data);
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
                    console.log(data);
                    this.updateCloudInfo();
                })
            },
            remove(node, data) {
                console.log(node, data);
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
                console.log(content)
                this.$req.post('/cloud/save_directory', {
                    jsonpObject: content,
                    directoryId: sessionStorage.getItem('userId')
                })
                    .then(res => {
                        if (res.code === 0) {

                        }
                    })
            },

            getCloudInfo: function (tab) {
                if (tab.label == "我的云盘") {
                    this.$req.post('/cloud/get_directory', {
                        userId: sessionStorage.getItem('userId')
                    })
                        .then(res => {
                            if (res.code === 0) {
                                this.data = JSON.parse(res.data);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '网盘资源获取失败！'
                                });
                            }
                        })
                }

            },

            submit_file_success:function(){

                const newChild={id:id++, label: this.fileName,};
                this.node.data.children.push(newChild);
                console.log(this.data);
                //
                // this.node.data.children.push(newChild);
                // console.log(this.node.data.children)
                // const newChild = {id: id++, label: 'value', children: []};
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
                // this.$message({
                //     type: 'success',
                //     message:'提交成功！'
                // });
            },

            before_upload:function(file){
                this.fileName=file.name;
                if(this.node_data ==''||this.node==''){
                    this.$message({
                        type: 'error',
                        message:'请先选择上传路径！'
                    });
                    return false;
                }
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
                return this.ID+"                          ID是唯一标识，不可修改！";
            }
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