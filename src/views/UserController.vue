<template>
    <div>
        <el-table :data="tableData">
            <el-table-column prop="userId" label="用户id" width="180">
            </el-table-column>
            <el-table-column prop="userPassword" label=用户密码" width="180">
            </el-table-column>
            <el-table-column prop="userNickname" label="用户真实姓名" width="180">
            </el-table-column>
            <el-table-column prop="userPermission" label="用户权限" width="180">
            </el-table-column>
            <el-table-column prop="userAccount" label="用户账号" width="180">
            </el-table-column>
            <el-table-column label="操作" width="350">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="编辑用户权限:"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span></span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="SelectPermission()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                realData: [],
                dialogVisible: false,
                options: [
                    {
                        value: '-1',
                        label: '黑名单'
                    }, {
                        value: '1',
                        label: '普通用户'
                    }, {
                        value: '2',
                        label: '超级会员'
                    }],
                value: ''
            }
        },
        methods: {
            changePermission() {
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].userPermission == -1) {
                        this.tableData[i].userPermission = "黑名单";
                    } else if (this.tableData[i].userPermission == 0) {
                        this.tableData[i].userPermission = "站长";
                    } else if (this.tableData[i].userPermission == 1) {
                        this.tableData[i].userPermission = "普通用户";
                    } else if (this.tableData[i].userPermission == 2) {
                        this.tableData[i].userPermission = "超级会员";
                    }
                }
            },
            listAllUsers() {
                this.$req.post('/user/get_all')
                    .then(res => {
                        if (res.code == 0) {
                            this.tableData = res.data;
                            this.changePermission();
                            console.log(this.tableData)
                        } else {
                            this.$message.error("失败")
                        }
                    })
            },
            SelectPermission() {
                if (this.value == "") {
                    this.$message.error("请重新选择！");
                    return;
                }
                this.realData.userPermission = this.value;
                var data = this.realData;
                this.$req.post('/user/update_user', data)
                    .then(res => {
                        if (res.code == 0) {
                            this.listAllUsers();
                            this.$message.success("更新成功");
                        } else {
                            this.$message.error("更新失败");
                        }
                    })
                this.dialogVisible = false;
            },
            handleDelete(index, row) {
                this.dialogVisible = true;
                this.realData = row;
                this.value = row.userPermission;
                // this.realData[index].userPermission = -1;
                // this.$req.post('/user/update_user', data)
                //     .then(res => {
                //         if (res.code == 0) {
                //             this.listAllUsers();
                //             this.$message.success("删除成功")
                //         } else {
                //             this.$message.error("删除失败")
                //         }
                //     })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        },
        created() {
            this.listAllUsers()
        }
    };
</script>
<style>

</style>