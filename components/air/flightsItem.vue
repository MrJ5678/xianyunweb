<template>
  <div class="flight-item">
    <div @click="handleShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ data.airline_name }} </span> {{ data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row
            type="flex"
            justify="space-between"
            class="flight-info-center"
          >
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span
                >{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span
              >
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ rankTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span
                >{{ data.org_airport_name }}{{ data.org_airport_quay }}</span
              >
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ data.base_price }}</span
          >起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-if="isShow">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item, index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span> | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">
              ￥{{ item.org_settle_price }}
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">
                选定
              </el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>经济舱</span> | 上海一诺千金航空服务有限公司
            </el-col>
            <el-col :span="5" class="price">
              ￥1345
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">
                选定
              </el-button>
              <p>剩余：83</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    // 计算出相差时间
    rankTime() {
      // 转化为分钟
      const dep = this.data.dep_time.split(":");
      const arr = this.data.arr_time.split(":");
      const depVal = dep[0] * 60 + +dep[1];
      const arrVal = arr[0] * 60 + +arr[1];

      // 到达时间相减得到分钟
      let dis = arrVal - depVal;

      // 如果是第二天凌晨时间段，需要加24小时
      if (dis < 0) {
        dis = arrVal + 24 * 60 - depVal;
      }

      // 得到相差时间
      return `${Math.floor(dis / 60)}时${dis % 60}分`;
    }
  },
  methods: {
    // 切换票务信息
    handleShow() {
      this.isShow = !this.isShow
    }
  }
};
</script>

<style lang="less" scoped>
.flight-item {
  width: 100%;
  border: 1px solid #ddd;
  margin-bottom: 10px;

  .flight-info {
    width: 100%;
    height: 76px;
    padding: 15px;
    background-color: #fff;

    > div {
      &:first-child {
        text-align: center;
        span {
          font-size: 14px;
        }
      }

      &:last-child {
        padding-left: 20px;
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      margin-left: 3px;
      margin-right: 5px;
      color: orange;
      font-size: 24px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px solid #eee;
  padding: 0 20px;

  > div {
    &:first-child {
      font-size: 14px;
    }
  }

  .flight-sell {
    padding: 10px 0;
    font-size: 12px;
    border-bottom: 1px solid #eee;

    .flight-sell-left {
      span {
        color: green;
      }
    }

    &:last-child {
      border-bottom: none;
    }

    .price {
      color: orange;
      font-size: 20px;
    }

    .choose-button {
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
      p {
        text-align: center;
        color: #666;
      }
    }
  }
}
</style>
