<template>
  <div id="app">
    <div id="nav">
      <el-container>
        <el-header class="header" height="80px">
          <div><p class="ziti">OUR WEBSITE</p></div>
          <div style="position: relative;float: left;top: -115px" v-show="returnBody" @click="goTo('/')">
              <i class="el-icon-back"></i>
          </div>
          <el-dropdown style="float: right;position: relative;top: -117px;right: 20px " v-show="WelcomeBtn" @command="handleCommand">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="openUrl">个人中心</el-dropdown-item>
              <el-dropdown-item style="text-align: center" command="cancellation">注  销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float: right;font-size: 20px;position: relative;top: -100px" v-show="LoginBtn"><i class="el-icon-switch-button"></i><el-button type="text" style="margin-left: 3px;font-size: 15px;margin-right: 10px;color: #eee" @click="ShowLogin">登录</el-button></div>
        </el-header>
        <el-container>
         <router-view/>
        </el-container>
        <el-footer class="footer" height="60px">
          <p>熬粑马版权所有</p>
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
                <el-input v-model="ruleForm.acct" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 323px">
                <el-button type="info" @click="register_cancel">取消</el-button>
                <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>
      </el-dialog>
      <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model.number="ruleForm1.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
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
      return{
        ruleForm: {
          acct:'',
          pass: '',
          checkPass: '',
          age: ''
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
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
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
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        outVisible:false,
        innerVisible:false,
        LoginBtn:true,
        WelcomeBtn:false,
        returnBody:false,
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
          this.$message({
            type: 'success',
            message:'注销成功'
          });
          this.WelcomeBtn=false;
          this.LoginBtn=true;
        }
        if (command==='openUrl'){
          this.$router.push('/Person');
          this.returnBody=true;
        }
      },

      //注册
      submit:function(formName){
        this.$refs[formName].validate((valid) => {
          if (valid){
            this.$req.post('/user/insertUser',{
                userId:this.ruleForm.acct,
                password:this.ruleForm.pass,
                nickname:this.ruleForm.acct,
                permission:2
            })
                .then(res=>{
                   if (eval(res.data).code===0){
                       this.$message({
                           type: 'success',
                           message:'注册成功'
                       });
                       this.ruleForm1.name=this.ruleForm.acct;
                       this.ruleForm1.pass=this.ruleForm.pass;
                       this.innerVisible=false;
                   }else if (eval(res.data).code===2){
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

      //注册按钮
      registered:function(){
        this.innerVisible=true;
      },
      //登录
      Login:function(formName){
        this.$refs[formName].validate((valid) => {
            if (valid){
              this.$req.post('/user/Login',{
                name:this.ruleForm1.name,
                pass:this.ruleForm1.pass
              })
                .then(res=>{
                  if (eval(res.data).code===0){
                    this.data=eval(res.data).data;
                    this.$message({
                      type: 'success',
                      message:this.data.nickname + '  欢迎您!'
                    });
                    this.outVisible=false;
                    this.WelcomeBtn=true;
                    this.LoginBtn=false;
                    sessionStorage.setItem('user',this.ruleForm1.name);
                    sessionStorage.setItem('permission',this.data.permission);
                    sessionStorage.setItem('nickname',this.data.nickname);
                  }
                  else {
                    this.$message({
                      type: 'error',
                      message: '账号或密码错误'
                    });
                  }
                })
            }else {
              this.$message({
                type: 'error',
                message:'请先完善信息'
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
        this.returnBody=false;
      },
    },
    created() {
      if(sessionStorage.length===0){
        this.WelcomeBtn=false;
        this.LoginBtn=true;
      }else{
        this.LoginBtn=false;
        this.WelcomeBtn=true;
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
</style>
