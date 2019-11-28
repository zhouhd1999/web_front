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
                        <el-button type="text" style="font-size: 20px">{{item.title}}</el-button>
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
                hotRanking:[{link:'1231',title:'123123',like:5},
                    {link:'1231',title:'123123123213',like:5},
                    {link:'1231',title:'123123123123213',like:5},
                    {link:'1231',title:'123123123213',like:5},
                    {link:'1231',title:'1231211233',like:5},
                ],
                article:[{tag:'Python',title:'231qwewqeqweqweqwqe23',img: '123',introduction:'5464646456465',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'C',title:'231qweqwqwe23',img: '123',introduction:'5464646456465',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'Python',title:'23qwewqeqweqwqweqweqwweqweqweqwqwe123',img: '123',introduction:'5464643qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee33333eeeee6456465',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'C',title:'231qweqweqewweq23',img: '123',introduction:'5464646456465',date:'2019/11/29',author:'123',link:'132323132',like:5},
                    {tag:'Python',title:'23123',img: '123',introduction:'5464646456465',date:'2019/11/29',author:'123',link:'132323132',like:5}]
            }
        },
        methods:{

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