<template>
  <div style="text-align: center">
    <h2>TheDashboard</h2>

    <select v-model="selectedCategory" @change="updateChart">
      <option value="fruits">Fruits</option>
      <option value="vehicles">Vehicles</option>
    </select>

    <PieChart
      :chartData="chartData"
      :chartOptions="chartOptions"
      @slice-click="handleSliceClick"
    />

    <div v-if="selectedDetails">
      <h3>Details for {{ selectedDetails.label }}</h3>
      <table border="1" style="margin: auto; margin-top: 20px;">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in selectedDetails.items" :key="i">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PieChart from './PieChart.vue'

export default {
  name: 'TheDashboard',
  components: { PieChart },
  data() {
    return {
      selectedCategory: 'fruits',
      selectedDetails: null,
      // RECTIFIED LINE: Initialize chartData with expected structure
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Category Breakdown'
          }
        }
      },
      datasets: {
        fruits: [
          {
            label: 'Apple',
            value: 40,
            items: [
              { name: 'Apple A', value: 20 },
              { name: 'Apple B', value: 20 }
            ]
          },
          {
            label: 'Banana',
            value: 30,
            items: [
              { name: 'Banana A', value: 10 },
              { name: 'Banana B', value: 20 }
            ]
          },
          {
            label: 'Orange',
            value: 30,
            items: [
              { name: 'Orange A', value: 15 },
              { name: 'Orange B', value: 15 }
            ]
          }
        ],
        vehicles: [
          {
            label: 'Car',
            value: 50,
            items: [
              { name: 'Car A', value: 30 },
              { name: 'Car B', value: 20 }
            ]
          },
          {
            label: 'Bike',
            value: 30,
            items: [
              { name: 'Bike A', value: 15 },
              { name: 'Bike B', value: 15 }
            ]
          },
          {
            label: 'Bus',
            value: 20,
            items: [
              { name: 'Bus A', value: 20 }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.updateChart()
  },
  methods: {
    updateChart() {
      const currentData = this.datasets[this.selectedCategory]

      // Add a check for currentData to ensure it's an array, although with the provided structure, it should be
      if (!currentData || !Array.isArray(currentData)) {
        console.error('Data for selected category is invalid or missing:', this.selectedCategory, currentData);
        this.chartData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
        this.selectedDetails = null;
        return;
      }

      this.chartData = {
        labels: currentData.map(item => item.label),
        datasets: [
          {
            data: currentData.map(item => item.value),
            backgroundColor: ['#f87979', '#36a2eb', '#ffcd56']
          }
        ]
      }
      this.selectedDetails = null
    },
    handleSliceClick(index) {
      // Ensure currentCategoryData exists before trying to access index
      const currentCategoryData = this.datasets[this.selectedCategory];
      if (currentCategoryData && currentCategoryData[index]) {
        this.selectedDetails = currentCategoryData[index]
      } else {
        this.selectedDetails = null; // Clear details if index is invalid
      }
    }
  }
}
</script>