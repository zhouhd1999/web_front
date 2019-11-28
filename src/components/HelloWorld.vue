<template>
  <div class="hello">
    <el-button>{{ msg }}</el-button>
    <p>{{wechat}}</p>
    <p>{{greeting()}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      msg:"hahah",
      wechat:"123123",
    };
  },
  methods:{
    greeting(){
      return `大家好我是${this.msg},我的微信是${this.wechat}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
