<template>
    <div>
        <div style="text-align: center;margin-top: 50px">
            <form action="http://127.0.0.1:8081/cloud/uploadFile" method="post" enctype="multipart/form-data">
                <p><input type="file" name="fileName"/></p>
                <p><input type="submit" value="上传视频"/></p>
            </form>
            <form action="chaxun" >
                <p><input type="submit" value="查询视频"/></p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalDiary"
    }
</script>

<style scoped>

</style>