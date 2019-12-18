<template>
    <div style="min-height: 1000px">
        <div style="width: 1000px;height: 100px">
            <el-tag
                    :key="tag.tagName"
                    v-for="tag in this.tags0"
                    closable
                    :disable-transitions="false"
                    @close="handleClose0(tag)"
                    style="margin-right: 50px">
                {{tag.tagName}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible0"
                    v-model="inputValue0"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm0"
                    @blur="handleInputConfirm0"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" style="margin-right:50px;margin-top: 25px" @click="showInput0">+ 新增生活笔记</el-button>
        </div>
        <el-divider></el-divider>

        <div style="width: 1000px;height: 50px;">
            <el-tag
                    :key="tag.tagName"
                    v-for="tag in this.tags1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose1(tag)"
                    style="margin-right: 50px">
                {{tag.tagName}}
            </el-tag>
            <el-input

                    class="input-new-tag"
                    v-if="inputVisible1"
                    v-model="inputValue1"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm1"
                    @blur="handleInputConfirm1"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small"  style="margin-right:50px;margin-top: 25px" @click="showInput1">+ 新增技术杂谈</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "TagManagement",
        data(){
           return{
               tags0:[],
               tags1:[],
               inputVisible1: false,
               inputValue1: '',
               inputVisible0: false,
               inputValue0: ''
           }
        },
        methods: {
            // handleClose1(tag) {
            //     var data={
            //         tagId:tag.tagId
            //     };
            //     console.log(data)
            //     this.$req.post('/tag/delete_tag',data)
            //         .then(res=>{
            //             if (res.code===0)
            //             {
            //                 this.tags1.splice(this.tags1.indexOf(tag), 1);
            //                 this.getAllTag();
            //                 this.$message.success("删除标签成功");
            //             }
            //             else if(res.code===601){
            //                 this.$message.error("标签内有文章");
            //                 return;
            //             }
            //             else {
            //                 this.$message.error("删除标签失败");
            //             }
            //         })
            //
            // },
            handleClose0(tag) {
                var data={
                    tagId:tag.tagId
                };
                console.log(tag)
                // console.log(tag.tagId);
                this.$req.post('/tag/delete_tag',data)
                    .then(res=>{
                        if (res.code===0)
                        {
                            console.log(tag.tagType)
                            if(tag.tagType == 0) {
                                this.tags0.splice(this.tags0.indexOf(tag), 1);
                            }

                            this.getAllTag();
                            this.$message.success("删除标签成功");
                        }else if(res.code===601){
                            this.$message.error("标签内有文章");
                            return;
                        }
                        else {
                            this.$message.error("删除标签失败");
                        }
                    })

            },

            handleClose1(tag) {
                var data={
                    tagId:tag.tagId
                };
                console.log(tag)
                // console.log(tag.tagId);
                this.$req.post('/tag/delete_tag',data)
                    .then(res=>{
                        if (res.code===0)
                        {
                            console.log(tag.tagType)

                            if(tag.tagType == 1){
                                this.tags1.splice(this.tags1.indexOf(tag), 1);
                            }
                            this.getAllTag();
                            this.$message.success("删除标签成功");
                        }else if(res.code===601){
                            this.$message.error("标签内有文章");
                            return;
                        }
                        else {
                            this.$message.error("删除标签失败");
                        }
                    })

            },
            handleInputConfirm0() {
                let inputValue0 = this.inputValue0;
                var data = {
                    tagName: inputValue0,
                    tagType: 0
                };
                if (inputValue0) {
                    this.$req.post('/tag/insert_tag', data)
                        .then(res => {
                            if (res.code === 0) {
                                this.tags1.push({
                                    tagName: inputValue0,
                                    tagType: 0
                                });
                                this.getAllTag();
                                this.$message.success("标签添加成功！")
                            } else {
                                this.$message.error("标签添加失败！")
                            }
                        })
                }
                this.inputVisible0 = false;
                this.inputValue0 = '';
            },
            handleInputConfirm1() {
                let inputValue1 = this.inputValue1;
                var data={
                    tagName:inputValue1,
                    tagType: 1
                };
                if (inputValue1) {
                    this.$req.post('/tag/insert_tag',data)
                        .then(res=>{
                            if (res.code===0){
                                this.tags1.push({
                                    tagName:inputValue1,
                                    tagType:1
                                });
                                this.getAllTag();
                                this.$message.success("标签添加成功！")
                            }
                            else {
                                this.$message.error("标签添加失败！")
                            }
                        })
                }
                console.log(this.tags1)
                this.inputVisible1 = false;
                this.inputValue1 = '';
            },
            getAllTag(){
                this.tags0 = [];
                this.tags1=[];
                this.$req.post('/tag/get_all_tag')
                    .then(res => {
                        if (res.code === 0) {
                            for(var i = 0; i < res.data.length; i++){
                                if(res.data[i].tagType === 1){
                                    this.tags1.push(res.data[i]);
                                }
                                else if(res.data[i].tagType === 0){
                                    this.tags0.push(res.data[i]);
                                }

                            }

                        } else {
                            this.$message({
                                type: 'error',
                                message: '标签获取失败！'
                            });
                        }
                    })
            },

            showInput1() {
                this.inputVisible1 = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            showInput0() {
                this.inputVisible0 = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },


        },
        created() {
            this.getAllTag();
        }
    }
</script>

<style scoped>
    .tag0{
        position: relative;
        margin-top: 20px;
        padding: 20px 15px 30px 20px;
        width: 20%;
    }
     .el-tag + .el-tag {
         margin-left: 10px;
     }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .tagg{

    }
</style>