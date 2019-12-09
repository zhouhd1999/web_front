<template>
    <div class="index">
        <div>
            <el-row>
                <el-col :span="24">
                    <el-carousel :interval="3000" arrow="always" height="300px" type="card">
                        <el-carousel-item v-for="item in imageBox" :key="item.id">
                            <div class="el-carousel__item">
                                <img style="width: 100%; height: 100%;" :src="item.idView">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </div>
        <div class="rank">
            <div style="padding: 10px;font-size: 20px"><span>热门排行</span></div>
            <el-divider class="el-divider1"></el-divider>
            <ul v-for="(item,index) in hotRanking" :key="index">
                <li><label :class="'label'+index">{{index+1}}</label>
                    <el-button type="text" >{{item.title}}</el-button>
                    <div style="float: right;font-size: 15px;margin-right: 15px;margin-top: 5px" >
                        <img style="height: 15px;width: 15px;margin-right: 8px" :src="aixin"/>
                        <span style="color: #f78585;font-size: 14px">{{item.like}}个喜欢</span>
                    </div>
                </li>
            </ul>
        </div>
        <div style="margin-top: 20px" >
            <div v-for="(item,index) in article" class="content">
                <div class="top">
                    <img :src="tubiao" style="height: 20px;width: 20px" />
                    <span style="margin-left: 8px;font-size: 16px;position: relative;top: -2px">{{item.tag}}</span>
                    <div style="font-size: 20px;position: relative;top: -36px;margin-left: 180px">
                        <el-button type="text" style="font-size: 20px" @click="open_article">{{item.title}}</el-button>
                    </div>
                </div>
                <div class="mid">
                    <el-row>
                        <el-col :span="6"><img :src="hhh" style="height: 160px" /></el-col>
                        <el-col :span="18"><div style="padding: 10px"><span style="word-break: break-all;color: #777">{{item.introduction}}<br/></span></div></el-col>
                    </el-row>
                </div>
                <div class="bottom" style="float: right;font-size: 14px;color: #777">
                    <span style="margin-right: 60px"><i class="el-icon-user" style="margin-right: 10px"></i>{{item.author}}</span>
                    <span style="margin-right: 30px"><i class="el-icon-time" style="margin-right: 10px"></i>{{item.date}}</span>
                    <img style="height: 15px;width: 15px;margin-right: 8px;margin-left: 30px" :src="aixin"/>
                    <span style="color: #f78585;">{{item.like}}个喜欢</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'
    import aixin from '@/assets/爱心.png'
    import tubiao from '@/assets/标签.png'
    import hhh from '@/assets/img-3.png'
    export default {

        name: 'Index',
        data(){
            return{
                aixin:aixin,
                tubiao:tubiao,
                hhh:hhh,
                imageBox:[{id:0,idView:require("../../assets/11.jpg")},
                    {id:1,idView:require("../../assets/img-2.png")},
                    {id:2,idView:require("../../assets/img-3.png")}
                ],
                hotRanking:[{link:'1231',title:'2019年区块链趋势解析！',like:56},
                    {link:'1231',title:'《吐血整理》系列-顶级程序员工具集',like:32},
                    {link:'1231',title:'程序员：我终于知道post和get的区别',like:31},
                    {link:'1231',title:'Python十大装B语法',like:28},
                    {link:'1231',title:'小白都能看得懂的java虚拟机内存模型',like:25},
                ],
                article:[{tag:'Python',title:'sklearn贝叶斯分类器的案例',img: '123',introduction:'贝叶斯分类器的原理比较简单，可以自己去百度了解原理，这篇文章就是讲一讲贝叶斯分类器的实际应用案例。案例：研究期末考试前一周的行为（假设有三种：1.打游戏 2.逛街 3.学习）对于期末开考试的影响（就是是否挂科）。首先要有一个样本库，没办法，只能自己去创建了，我们就按照这个形式来创建样本库，形...',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'Java',title:'Java世界最常用的工具类库',img: '123',introduction:'jdk1.8之前，日期操作类常用的只有java.util.Date和java.util.Calendar，但是这2个类的易用性实在太差了，SimpleDateFormat不是线程安全的 。这就逼迫用户去选择第三方的日期操作类，Joda Time就是其中的佼佼者。后来Java自身也意识到了这个问题，于是jdk1.8大量借鉴了Joda Time的理念，推出了新的日期api，...',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'Python',title:'23qwewqeqweqwqweqweqwweqweqweqwqwe123',img: '123',introduction:'5464643qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee33333eeeee6456465',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'C',title:'231qweqweqewweq23',img: '123',introduction:'5464646456465',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'Python',title:'23123',img: '123',introduction:'5464646456465',date:'2019/11/29',author:'123',link:'132323132',like:5}]
            }
        },
        methods:{
            open_article:function () {
                this.$router.push('/Article');
            }
        },
        components: {
        },
        mounted(){

        }


    }
</script>

<style scoped>

    .top{
        height: 40px;

    }
    ul{
        list-style: none;
        margin: 2px;
    }
    label{
        margin-right: 8px;
        padding: 2px 10px;
        top: -1px;
        font-size: 14px;
    }
    .label0{
        background-color: #fd8c84;
    }
    .label1{
        background-color: #6fc299;
    }
    .label2{
        background-color: #81c1f2;
    }
    .label3{
        background-color: #999;
    }
    .label4{
        background-color: #999;
    }
    .el-divider1{
        margin: 6px 0 6px 0;
    }
    .el-carousel__item {
    }

    .index{
        /*background-color: white;*/
        width: 100%;
    }

    .rank{
        background-color: white;
        font-size: 20px;
        position: relative;
        top: 10px;
    }

    .content{
        margin-top: 10px;
        position: relative;
        background-color: white;
        height: 200px;
        padding: 20px 15px 30px 20px;
    }
</style>