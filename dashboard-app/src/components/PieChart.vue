<template>
  <div style="width: 400px; height: 400px;">
    <Pie :data="chartData" :options="chartOptions" @click="onClick" ref="pieChartRef" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    chartData: Object,
    chartOptions: Object
  },
  emits: ['slice-click'],
  methods: {
    onClick(evt) {
      const chart = this.$refs.pieChartRef.chart
      const points = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true)
      if (points.length > 0) {
        const index = points[0].index
        this.$emit('slice-click', index)
      }
    }
  }
}
</script>
