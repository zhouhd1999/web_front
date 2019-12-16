<template>
    <div class="leavemessage">
        <div class="top">
            <span>{{tagName}}</span>
        </div>
        <el-divider ></el-divider>
    </div>
</template>

<script>
    export default {
        name: "Technology",
        data(){
            return{
                tagId:this.$route.params.tagId,
                tagName:this.$route.params.tagName,
                article:[]
            };
        },
        methods:{
            getArticleByTagId:function () {
                this.$req.post('article/get_article_by_tag_id',{
                    tagId: this.tagId
                })
                    .then(res=>{
                        if (res.code===0){
                            this.article=res.data;
                        }
                    })
            }
        },
        created() {
            this.getArticleByTagId();
        },
        watch:{
            tagName:{

            }
        }
    }
</script>

<style scoped>
    .leavemessage{
        background-color: white;
    }
    .top{
        height: 40px;
        font-size: 20px;
        position: relative;
        left: 20px;
        top: 20px;
    }
</style>