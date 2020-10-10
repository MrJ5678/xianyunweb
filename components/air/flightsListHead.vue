<template>
    <el-row class="flight-title">
        <el-col :span="5">
            航空信息
        </el-col>
        <el-col :span="14">
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    起飞时间
                </el-col>
                <el-col :span="12">
                    到达时间
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="5">
            价格
        </el-col>
    </el-row>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.flight-title {
    width: 100%;
    height: 38px;
    margin-bottom: 20px;
    font-size: 12px;
    text-align: center;
    line-height: 38px;
    color: #666;
    background-color: #f6f6f6;
    border: 1px solid #ddd;

}
</style>