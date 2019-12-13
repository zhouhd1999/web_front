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
                            <el-button type="text" @click="new_file">新建文件夹</el-button>
                            <el-button type="text" @click="delete_file">删除</el-button>
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
                        <el-button @click="jsontest">123</el-button>
<!--                        <el-button @click="test1">网盘测试按钮1</el-button>-->
<!--                        <input id="file" name="file" type="file" @change="getFile($event)"/>-->
<!--                        <el-button @click="update">上传</el-button>-->
<!--                        <input type="file" ref="myfile">-->
<!--                        <el-button @click="importData" type="success" size="mini" icon="el-icon-upload2">导入数据</el-button>-->
<!--                        <el-upload-->
<!--                                class="upload-demo"-->
<!--                                action="/cloud/uploadFile"-->
<!--                                :on-preview="handlePreview"-->
<!--                                :on-remove="handleRemove"-->
<!--                                :before-remove="beforeRemove"-->
<!--                                multiple-->
<!--                                :limit="3"-->
<!--                                :on-exceed="handleExceed"-->
<!--                                :file-list="fileList">-->
<!--                            <el-button size="small" type="primary">点击上传</el-button>-->
<!--                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                        </el-upload>-->
<!--                        <form>-->
<!--                            <input type="file" @change="getFile($event)">-->
<!--                            <button class="button button-primary button-pill button-small" @click="update($event)">提交</button>-->
<!--                        </form>-->
<!--                        <div id="uploadDiv">-->
<!--                            <input type="file" value="" id="file" @change="uploadConfig" name="file">-->
<!--                        </div>-->
<!--                        <form method="post"   enctype="multipart/form-data">-->
<!--                            <input type="file" id="addForm" class="addForm" name="fileName" @change="getFile"><br>-->
<!--&lt;!&ndash;                            <input type="submit" value="上传视频"/>&ndash;&gt;-->
<!--                            <el-button @click="update">11</el-button>-->
<!--                        </form>-->
<!--                        <input class="file" type="file" title="请选择文件" value="请选择文件" @change="getFile">-->
<!--                        <button class="submit" @click="submit1">提交</button>-->
                        <!--                        <el-button @click="jsontest">211</el-button>-->
<!--                        <el-upload-->
<!--                                style="display: inline"-->
<!--                                :show-file-list="false"-->
<!--                                :on-success="onSuccess"-->
<!--                                :on-error="onError"-->
<!--                                :before-upload="beforeUpload"-->
<!--                                action="/cloud/uploadFile">-->
<!--                            <el-button size="mini" type="success" >123</el-button>-->
<!--                        </el-upload>-->
<!--                        <el-dialog >-->
<!--                            <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">-->
<!--                                <div class="add-file-right-img" style="margin-left:70px;">上传文件：</div>-->
<!--                                <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input" style="margin-left:70px;" accept=".docx,.doc,.pdf">-->
<!--                                <span class="add-file-right-more">支持扩展名：.doc .docx .pdf </span>-->
<!--                            </div>-->
<!--                            <div class="add-file-list">-->
<!--                                <ul>-->
<!--                                    <li v-for="(item, index) in addArr" :key="index"><a >{{item.name}}</a></li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                            <div slot="footer" class="dialog-footer">-->
<!--                                <el-button type="primary" @click="submitAddFile" size="small">开始上传</el-button>-->
<!--                            </div>-->
<!--                        </el-dialog>-->
<!--                        <el-upload-->
<!--                                class="upload-demo"-->
<!--                                :action="doupload()"-->
<!--                                :before-upload="before_Upload"-->
<!--                                ref="newupload"-->
<!--                                multiple-->
<!--                        >-->
<!--                            <el-button style="background-color:#F95714;border-radius:4px;width:220px;height:40px;color:#fff" >上传附件</el-button>-->
<!--                            &lt;!&ndash; <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> &ndash;&gt;-->
<!--                        </el-upload>-->
                        <!--选择文件-->
                            <el-upload
                                    action="http://127.0.0.1:8081/cloud/uploadFile"
                                    :limit="1"
                                    :on-remove="handleRemove">
                                <el-button size="small" type="primary">选取模板</el-button>
                                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                                <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过2M</div>
                            </el-upload>
                            <el-button v-on:click="uploadDialogFormVisible = false">关闭</el-button>
                            <!--<el-button type="primary" v-on:click="uploadDialogFormVisible = false">上传</el-button>-->
                            <el-button type="primary" @click="submitUpload">上传到服务器</el-button>
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
                    <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    var formData = new FormData();
    let id = 1000;
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
            submitUpload: function () {

                let formData = new FormData();
                this.fileList.forEach(function (file) {
                    console.log(file);
                    formData.append("files", file);
                });
                let config = {
                    'Content-Type': 'multipart/form-data'
                };
                formData.append("area", this.area);
                let var_this = this;
                this.$req.post('/cloud/uploadFile', formData, config)
                    .then(function (response) {
                        if (response.data.status == 1) {
                            var_this.$message({
                                message: `${var_this.area}区域${var_this.fileList.length}个文件(上传/更新)成功`,
                                type: 'success'
                            });
                        } else {
                            var_this.$message({
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            jsontest: function () {
                console.log((JSON.stringify(this.data)));
            },

            getFile(event) {
                this.file = event.target.files[0];

            },
            submitAddFile() {
                if (0 == this.addArr.length) {
                    this.$message({
                        type: 'info',
                        message: '请选择要上传的文件'
                    });
                    return;
                }

                var formData = new FormData();
                formData.append('num', this.addType);
                formData.append('linkId', this.addId);
                formData.append('fileName', this.addFileName);
                for (var i = 0; i < this.addArr.length; i++) {
                    formData.append('fileUpload', this.addArr[i]);
                }
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': this.token
                    }
                };
                this.$req.post('/cloud/uploadFile', formData, config)
                    .then((response) => {
                        if (response.data.info == "success") {
                            this.$message({
                                type: 'success',
                                message: '附件上传成功!'
                            });
                        }
                    })
            },

            doupload() {
                return 12312; // 一次接口
            },
            //上传
            before_Upload(file) {
                //  表单提交方式
                let FormDatas = new FormData()
                FormDatas.append('fileName', file)
                FormDatas.append('bizTable', 'candidate')  //其他参数
                FormDatas.append('bizId', '6')//候选人id<===========!
                console.log(FormDatas)
                this.$req.post({
                    url: '/cloud/uploadFile',   //  二次接口
                    headers: headers('multipart/form-data'),
                    data: FormDatas
                }).then(function (res) {
                    if (res.data.code == 10000) {
                        that.$message.success(res.data.msg);
                    } else {
                        that.$message.error(res.data.msg);
                    }
                })
            },


            //树形控件
            new_file: function () {
                this.append(this.node_data);
            },
            delete_file: function () {
                if (this.node_data.id === 1) {
                    this.$message({
                        type: 'error',
                        message: '根目录禁止删除!'
                    });
                } else {
                    this.remove(this.node, this.node_data);
                }
            },
            handleNodeClick(data, node) {

                this.node_data = data;
                this.node = node;
            },
            append(data) {
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


            uploadConfig: function (e) {
                var formData = new FormData();
                formData.append('fileName', e.target.files[0]);
                var url = '/cloud/uploadFile';
                var config = 'multipart/form-data; charset=utf-8';
                this.$req.post(url, {
                    data: formData
                })
                    .then(function (response) {
                        console.log(response.data)
                    })
            },

            update: function (event) {
                // event.preventDefault();
                // let formData = new FormData();
                // formData.append('fileName', this.file);
                // console.log(formData.get('fileName'))
                // let config = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data;charset=UTF-8',
                //
                //     }
                // };
                // this.$req.post('http://127.0.0.1:8081/cloud/uploadFile',{
                //     data:formData,
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                //         'http-equiv':"Content-Type"
                //         //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
                //     }
                // })
                //     .then(function (response) {
                //     console.log(response.data)
                //
                // })
                // var formData = new FormData();
                // formData.append('fileName',this.file)
                // this.$req.post('/cloud/uploadFile', formData, {
                //
                // }).then(function (response) {
                //     console.log(response);
                // })
                formData.append('file', this.file) // 'file' 这个名字要和后台获取文件的名字一样;
                //'userfile'是formData这个对象的键名
                this.$req.post({
                    url: '/ensure/uploadwork',   //****: 你的ip地址
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
                        //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
                    }
                }).then((res) => {
                    console.log(res.data);
                }) // 发送请求




    },

            submit1: function() {
                formData.append('file', this.file) // 'file' 这个名字要和后台获取文件的名字一样;
                formData.append('user','this.name')

                //'userfile'是formData这个对象的键名
                this.$req.post('/cloud/uploadFile',{
                    //****: 你的ip地址
                    data: formData,
                    processData: false,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
                        //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
                    }
                }).then((res) => {
                    console.log(res.data);
                }) // 发送请求
            },


            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },

            submit:function(formName){
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