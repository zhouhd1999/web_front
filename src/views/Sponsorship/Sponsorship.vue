<template>
    <div class="sponsor">
        <div class="top">
            <span>赞助作者</span>
            <el-button type="info" style="float: right;right: 30px;position: relative;bottom: 5px"><i class="el-icon-share"></i>分享</el-button>
        </div>
        <el-divider ></el-divider>
        <div class="content">
            <h2>如果您喜欢我的文章，感觉我的文章对您有帮助，不妨动动您的金手指给予小额赞助，予人玫瑰，手有余香，不胜感激。</h2>
            <h3>赞助方式一</h3>
            <h4>手机支付宝扫一扫</h4>
            <div style="text-align: center">
                <el-avatar shape="square" :size="300" :src="alipay"></el-avatar>
            </div>
            <h3>赞助方式二</h3>
            <h4>手机微信宝扫一扫</h4>
            <div style="text-align: center">
                <el-avatar shape="square" :size="290" :src="wechatpay"></el-avatar>
            </div>
        </div>
    </div>
</template>

<script>
    import alipay from '@/assets/alipay.jpg'
    import wechatpay from '@/assets/wechatpay.png'
    export default {
        name: "Sponsorship",
        data(){
            return{
                alipay:alipay,
                wechatpay:wechatpay,
            };
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