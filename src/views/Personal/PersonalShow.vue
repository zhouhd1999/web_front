<template>
    <div>
        <div style="margin-top: 20px">
            <div v-for="(item,index) in article" class="content">
                <div class="top">
                    <div style="font-size: 20px;position: relative;top: -18px;margin-left: 80px">
                        <el-button type="text" style="font-size: 20px" @click="open_article(item,index)">{{item.articleName}}</el-button>
                    </div>
                </div>
                <div class="mid">
                    <el-row>
                        <el-col :span="6"><img :src="hhh" style="height: 160px" /></el-col>
                        <el-col :span="18"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.articleDescribe}}<br/></span></div></el-col>
                    </el-row>
                </div>
                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                    <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.articleDateTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalShow"
    }
</script>

<style scoped>

</style>