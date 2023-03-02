<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card" shadow="hover">
        <div class="user">
          <img src="../assets/image/user.png" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间 ：<span>2007-8-29</span></p>
          <p>上次登录地点 ：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px" shadow="hover">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="val"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- 折线图内容 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 260px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from "echarts";
import { getData } from "../api/index";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "商品",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      this.tableData = data.data.tableData;
      //初始化echats实例
      var echarts1 = echarts.init(this.$refs.echarts1);
      //指定图标配置和数据
      var echarts1Option = {};
      // 处理数据xAxis;
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1Option.xAxis = xAxisData;

      echarts1Option.yAxis = {};

      echarts1Option.legend = xAxisData;

      echarts1Option.series = [];

      echarts1Option.tooltip = {
        trigger: "axis",
      };

      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });

      echarts1.setOption(echarts1Option);

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const eachrts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(eachrts2Option);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const eachrts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      echarts3.setOption(eachrts3Option);
    });
  },
};
</script>

<style lang='less' scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      margin-left: 60px;
      color: #666666;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    color: #fff;
    text-align: center;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      text-align: center;
      color: #999999;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>