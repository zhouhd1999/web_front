<template>
    <div>
        <el-container>
            <el-aside width="250px">
            </el-aside>
            <el-main>
                <div style="background-color: white">
                    <mavon-editor
                            style="height: 600px;width: 975.2px"
                            class="md"
                            :value="value"
                            :subfield="false"
                            :defaultOpen="'preview'"
                            :toolbarsFlag="false"
                            :editable="false"
                            :scrollStyle="true"
                            :ishljs="true"
                    ></mavon-editor>
                </div>
            </el-main>
            <el-aside width="250px">
            </el-aside>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "Article",
        data() {
            return {
                articleId:this.$route.params.articleId,
                value: ''
            };
        },
        methods:{
            getArticle(){
                this.$req.post('/article/get_article_by_article_id',{
                    articleId:this.articleId
                })
                    .then(res=>{
                        if (res.code===0){
                            this.value=res.data.articleContent;
                        }
                    })
            }
        },
        created() {
            this.getArticle();
        }
    }
</script>

<style scoped>

</style>