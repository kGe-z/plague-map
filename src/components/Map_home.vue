<template>
  <div class="map">
    <div id="chart" style="width: 100%;height:800px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import jsonp from "jsonp";

let option = {
  title: {
    text: "vue实现疫情地图",
    x: "center",
    textStyle: {
      color: "#9c0505"
    }
  },
  tooltip: {
    trigger: "item",
    formatter: "地区：{b}<br/>确诊：{c}"
  },
  series: [
    {
      name: "six",
      type: "map",
      mapType: "china",
      label: {
      show: true,
      color: "black"
      },
      emphasis: {
        label: {
          // color: "#fff",
          fontSize: 15
        },
        itemStyle: {
          // areaColor: "green"
        }
      }
    }
  ],
  visualMap: {
    type: "piecewise",
    show: true,
    pieces: [
      { min: 50000 }, // 不指定 max，表示 max 为无限大（Infinity）。
      { min: 10000, max: 50000 },
      { min: 5000, max: 9999 },
      { min: 1000, max: 4999 },
      { min: 200, max: 999 },
      { min: 1, max: 199, label: "10 到 200（自定义label）" },
      { value: 0 } // 表示 value 等于 123 的情况。
    ],
    inRange: {
      color: ["#fff", "#ffaa85", "#660208"],
      symbolSize: [30, 100]
    }
  }
};
export default {
  name: "Map_home",
  data() {
    return {
      myChart:''
    };
  },
  mounted() {
    this.getdata()

    this.myChart = echarts.init(document.getElementById("chart"));
  },
  methods: {
    getdata() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json",
        (err, res) => {
          let list = res.data.list.map(item => {
            return { name: item.name, value: item.value };
          });
          console.log(res.data.gntotal);
          option.series[0].data=list
          this.myChart.setOption(option)

        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
