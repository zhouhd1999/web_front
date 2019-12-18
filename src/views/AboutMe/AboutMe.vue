<template>
    <div class="sponsor">
        <div class="top">
            <span>关于博主</span>
            <el-button type="info" style="float: right;right: 30px;position: relative;bottom: 5px"><i class="el-icon-share"></i>分享</el-button>
        </div>
        <el-divider ></el-divider>
        <div class="content">
            <h2>个人简介</h2>
            <div style="text-align: center;font-size: 18px;">
                <span><img :src="man"></span><br/><br/>
                <span>谈笑风声工作室</span><br/><br/>
                <span>就职于浙大宁波理工学院</span><br/><br/>
                <span>现有四人</span><br/><br/>
                <span>欢迎加入我们</span><br/><br/>
            </div>

            <h3>与我联系</h3>
            <h4>手机微信扫一扫</h4>
            <div style="text-align: center">
                <el-avatar shape="square" :size="300" :src="wx"></el-avatar>
            </div>

        </div>
    </div>
</template>

<script>
    import man from '@/assets/man.png'
    import wx from '@/assets/wx.png'

    export default {
        name: "AboutMe",
        data(){
            return{
                man:man,
                wx:wx
            }
        }
    }
</script>

<style scoped>
    .sponsor{
        width: 99.5%;
        background: white;
    }
    .top{
        height: 40px;
        font-size: 20px;
        position: relative;
        left: 20px;
        top: 20px;
    }
    .content h2{
        font-size: 18px;
        text-align: center;
        margin: 20px 0 20px -4px;
        padding: 10px 20px 9px 10px;
        border-left: 4px solid black;
        background-color: #fbfbfb;
    }
    .content h3{
        font-size: 18px;
        text-align: center;
        margin: 20px 0 20px -4px;
        padding: 10px 20px 9px 10px;
        border-left: 4px solid black;
        background-color: #fbfbfb;
    }

    .content h4{
        font-size: 16px;
        text-align: center;
        margin: 20px 0 0 -4px;
        padding: 10px 20px 9px 10px;
    }
</style>