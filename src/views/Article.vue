<template>
    <div>
        <el-container>
            <el-aside width="250px">
            </el-aside>
            <el-main>
                <div style="background-color: white">
                    <mavon-editor
                            style="height: 600px;width: 1019.2px"
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
                value: '### test' // markdown语法
            };
        },
        methods:{
            getArticle(aId){
                this.$req.post('/article/get_article_by_a_id',{
                    aId:16
                })
                    .then(res=>{
                        if (res.code===0){
                            this.value=res.data.acontent;
                            console.log(res.data);
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