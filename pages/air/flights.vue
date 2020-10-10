<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between" :gutter="10">
      <!-- 顶部过滤列表 -->
      <el-col :span="18">
        <div class="flights-content">
          <!-- 过滤条件 -->
          <div></div>

          <!-- 航班头部布局 -->
          <FlightsListHead />

          <!-- 航班信息 -->
          <div v-if="flightsList.length">
            <FlightsItem
              v-for="(flight, idx) in flightsList"
              :key="idx"
              :data="flight"
            />

            <!-- 分页 -->
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsData.total"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <!-- 侧边栏 -->
        <div class="aside">
          <!-- 侧边栏组件 -->
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";

export default {
  components: {
    FlightsListHead,
    FlightsItem
  },
  data() {
    return {
      flightsData: {},
      flightsList: [],
      pageIndex: 1,
      pageSize: 5,
    };
  },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: "/airs",
      params: { ...query }
    }).then(res => {
      if (res.data) this.flightsData = res.data;
      this.flightsList = this.flightsData.flights.slice(0, 5);
    });
  },
  methods: {
    handleSizeChange(value) {
      this.pageIndex = 1
      this.pageSize = value

      this.setDataList()
    },
    handleCurrentChange(value) {
      this.pageIndex = value
      
      this.setDataList()
    },
    setDataList() {
      this.flightsList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize
      )
    }
  }
};
</script>

<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
  // background-color: orange;

  .el-row {
    .flights-content {
      // height: 200px;
      // background-color: green;
    }

    .aside {
      height: 200px;
      background-color: lightblue;
    }
  }
}
</style>
