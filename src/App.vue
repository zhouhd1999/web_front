<template>

  <div id="app">

    <div id="nav">

      <el-container>
        <el-header class="header" height="80px">
          <div><p class="ziti" @click="goTo('/')">MY WEBSITE</p></div>
          <div style="position: relative;float: left;top: -115px" v-show="returnBack" @click="goBack">
            <i class="el-icon-back"></i>
          </div>
          <el-dropdown style="float: right;position: relative;top: -117px;right: 20px " v-show="WelcomeBtn" @command="handleCommand">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="openUrl">个人中心</el-dropdown-item>
              <el-dropdown-item command="background" v-show="backgroundManagement">后台管理</el-dropdown-item>
              <el-dropdown-item style="text-align: center" command="cancellation">注  销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float: right;font-size: 20px;position: relative;top: -100px" v-show="LoginBtn">
            <i class="el-icon-switch-button"></i>
            <el-button type="text" style="margin-left: 3px;font-size: 15px;margin-right: 10px;color: #eee" @click="ShowLogin">登录</el-button>
          </div>
        </el-header>
        <el-container>
          <router-view/>
        </el-container>
        <el-footer class="footer" height="60px">
          <p>谈笑风生工作室版权所有</p>
        </el-footer>
      </el-container>

    </div>


    <!--    登录窗口-->
    <el-dialog
            title="登录"
            :visible.sync="outVisible"
            width="30%"
            :close-on-click-modal="false"
            :before-close="handleClose">
      <el-dialog
              width="40%"
              title="注册"
              :visible.sync="innerVisible"
              :close-on-click-modal="false"
              append-to-body>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="acct">
            <el-input placeholder="请输入账号" v-model="ruleForm.acct" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input placeholder="请再次输入密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkGraph">
            <div style="width: 40%">
              <el-input  placeholder="请输入验证码" class="yanzhengma_input"  v-model="ruleForm.checkGraph" autocomplete="off"/>
            </div>
          </el-form-item>
          <el-tag type="info" @click="createCode" class="verification" >{{Graph}}</el-tag>
          <!--              <el-form-item label="手机号码" prop="age">-->
          <!--                <el-input v-model.number="ruleForm.age"></el-input>-->
          <!--              </el-form-item>-->
          <el-form-item style="margin-left: 323px">
            <el-button type="info" @click="register_cancel">取消</el-button>
            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model.number="ruleForm1.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input placeholder="密码" type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="padding: 0 0 20px">
        <el-button @click="registered">注册</el-button>
        <el-button type="primary" @click="Login('ruleForm1')">登 录</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Person from "./views/Person";

  export default {
    data(){
      //外
      let checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不得为空'));
        }else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      //内
      let checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不得为空'));
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
      let validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      let checkGraph = (rule, value, callback) => {

        //console.log(this.realGraph);
        //console.log(value);
        if(value.toUpperCase() !== this.realGraph){
          callback(new Error('验证码错误'));
        }else{
          callback();
        }
      };


      return{

        backgroundManagement:false,
        Graph:'',
        realGraph:'',
        ruleForm: {
          acct:'',
          pass: '',
          checkPass: '',
          checkGraph:'',

          //age: ''
        },

        rules: {
          acct: [
            { validator: checkAccount, trigger:'blur'}
          ],
          pass: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          // age: [
          //   { validator: checkAge, trigger: 'blur' }
          // ]

          checkGraph:[
            {validator: checkGraph, trigger:'blur'}
          ],
        },
        ruleForm1: {
          pass: '',
          name: ''
        },
        rules1: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkUser, trigger: 'blur' }
          ]
        },
        circleUrl: this.GLOBAL.circleUrl,
        outVisible:false,
        innerVisible:false,
        LoginBtn:true,
        WelcomeBtn:false,
        returnBack:true,
        data:[]
      };
    },

    methods:{

      register_cancel:function(){
        this.innerVisible=false;
      },

      //头像下面的菜单
      handleCommand(command){
        //注销
        if (command==='cancellation'){
          sessionStorage.clear();
          console.log(sessionStorage)
          this.$message({
            type: 'success',
            message:'注销成功'
          });
          this.WelcomeBtn=false;
          this.LoginBtn=true;
        }
        if (command==='openUrl'){
          this.$router.push('/Person');
          this.WelcomeBtn=false;
          //this.returnBack=true;
        }
        if (command==='background'){
          this.$router.push('/Background');
          this.WelcomeBtn=false;
        }
      },

      //注册
      submit:function(formName){

        this.$refs[formName].validate((valid) => {
          if (valid){
            this.$req.post('/user/insert_user',{
              userAccount:this.ruleForm.acct,
              userPassword:this.ruleForm.pass,
              userNickname:this.ruleForm.acct,
              userPermission:1
            })
                    .then(res=>{
                      if (res.code===0){
                        this.$message({
                          type: 'success',
                          message:'注册成功'
                        });

                        this.ruleForm1.name=this.ruleForm.acct;
                        this.ruleForm1.pass=this.ruleForm.pass;
                        this.innerVisible=false;
                        this.ruleForm.acct='';
                        this.ruleForm.pass='';
                        this.ruleForm.checkPass='';
                        this.ruleForm.checkGraph='';
                      }else if (res.code===2){
                        this.$message({
                          type: 'error',
                          message:'该账号已存在'
                        });
                      } else {
                        this.$message({
                          type: 'error',
                          message:'注册失败'
                        });
                      }
                    });
          }else{
            this.$message({
              type: 'error',
              message:'请先完善信息'
            });
          }
        });
      },
      createCode(){
        //先清空验证码的输入
        this.code = "";
        this.Graph = "";
        this.realGraph="";
        //验证码的长度
        var codeLength = 4;
        //随机数
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
                's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

        for(var i = 0; i < codeLength; i++)  {
          //取得随机数的索引（0~35）
          var index = Math.floor(Math.random()*62);
          //根据索引取得随机数加到code上
          this.code += random[index];

        }
        //把code值赋给验证码
        this.Graph = this.code;
        this.realGraph = this.Graph.toUpperCase();
      },
      //注册按钮
      registered:function(){
        this.innerVisible=true;
        this.createCode();
      },
      //登录
      Login:function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid){
            this.$req.post('/user/login',{
              userAccount:this.ruleForm1.name,
              password:this.ruleForm1.pass
            })
                    .then(res=>{
                      if (res.code===0){
                        this.ruleForm1.name='';
                        this.ruleForm1.pass='';
                        this.data=res.data;
                        this.$message({
                          type: 'success',
                          message:this.data.userNickname + '  欢迎您!',

                        });
                        this.outVisible=false;
                        this.WelcomeBtn=true;
                        this.LoginBtn=false;
                        if (this.data.userPermission===0){
                          this.backgroundManagement=true
                        }else{
                          this.backgroundManagement=false
                        }
                        sessionStorage.setItem('userId',this.data.userId);
                        sessionStorage.setItem('userAccount',this.data.userAccount);
                        sessionStorage.setItem('userPermission',this.data.userPermission);
                        sessionStorage.setItem('userNickname',this.data.userNickname);
                        this.$req.post('/information/get_information_by_user_id',{
                          userId:this.data.userId
                        })
                                .then(res1=>{
                                  if(res1.code===0){

                                   //this.GLOBAL.setCircleUrl();
                                    this.circleUrl=require('@/assets/image/'+res1.data.infoHeadUrl)
                                    //console.log(this.GLOBAL.circleUrl)
                                   // this.circleUrl
                                    sessionStorage.setItem('circleUrl',this.circleUrl)
                                    //console.log(sessionStorage.getItem('circleUrl'))
                                  }
                                })
                      }
                      else {
                        this.$message({
                          type: 'error',
                          message: '账号或密码错误'
                        });
                        this.ruleForm1.pass=''
                      }
                    })
          }else {
            this.$message({
              type: 'error',
              message:'请填写正确信息'
            });
          }
        })

      },
      handleClose(done) {
        done();
      },
      ShowLogin:function(){
        this.outVisible=true;
      },

      goTo: function (index) {
        this.$router.push(index);
        //this.returnBack=false;
      },

      goBack:function () {
        this.$router.go(-1);
        //this.returnBack=false;
      }
    },
    created() {
      if(sessionStorage.length===0){
        this.WelcomeBtn=false;
        this.LoginBtn=true;
      }else{
        this.LoginBtn=false;
        this.WelcomeBtn=true;
      }
    },
    watch:{
      $route(to,from){

        this.circleUrl=sessionStorage.getItem('circleUrl');
        console.log(this.circleUrl)
        if (to.path.indexOf("/Body")>=0&&sessionStorage.length>0||to.name==='Index'&&sessionStorage.length>0){
          this.WelcomeBtn=true;
        }else{
          this.WelcomeBtn=false;
        }
      }
    }

  }
</script>

<style>

  body{
    margin: 0;
    padding: 0;
    background: #eee;
  }
  .header{
    padding: 0;
    margin: 0;
    background: none repeat scroll 0 0 #333;
    position: relative;
    text-align: center;
    font-size: 40px;
    color: #ddd;
  }

  .footer{
    background: none repeat scroll 0 0 #333;
    text-align: center;
    font-size: 12px;
    color: #ddd;
  }

  .ziti{
    position: relative;
    top: -26px;
  }

  .yanzhengma_input{
    font-family: 'Exo 2', sans-serif;
    color: #fff;
    outline: none;
    border-radius: 12px;
    letter-spacing: 1px;
    font-size: 17px;
    font-weight: normal;
    padding: 5px 0 5px 10px;
    height: 30px;
    margin-left: -10px;
  }
  .verification{
    border-radius: 12px;
    width:90px;
    letter-spacing:14px;
    float: right;
    height: 40px;
    transform: translate(-15px,0);
    position: relative;
    bottom: 53px;
    right: 138px;
  }
  .captcha{
    height: 50px;
    text-align: justify;
  }
</style>
