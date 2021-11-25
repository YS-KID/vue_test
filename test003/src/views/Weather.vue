<template>
  <div>
    <div class="d-flex flex-row ma-1" v-if="forecastWeather !== null">
      <v-card
        class="d-flex flex-column ma-1"
        style="width: 50%"
        outlined
        :img="require('@/assets/sky_2.jpg')"
      >
        <div class="d-flex ma-1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                {{ currentWeather.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h5">
                {{ currentWeather.sys.country }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div>
          <v-divider></v-divider>
        </div>
        <div class="d-flex flex-row ma-1">
          <div class="d-flex ma-1" style="width: 50%" outlined>
            <p class="averagetemp mt-11 ml-10">
              {{ (currentWeather.main.temp - 273.15).toFixed(2) }}&deg;C
            </p>
          </div>
          <div class="d-flex align-center ma-1" style="width: 50%" outlined>
            <v-img
              v-bind:src="getWeatherIconUrl(currentWeather.weather[0].icon)"
              alt="Sunny image"
              height="150"
              width="150"
              contain
            ></v-img>
          </div>
        </div>
        <div class="d-flex flex-column ma-1">
          <v-list-item>
            <v-list-item-icon class="tempicon">
              <v-icon>mdi-thermometer-high</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="moretemp">
              <p class="font-weight-bold">
                Highest temp:
                {{ (currentWeather.main.temp_max - 273.15).toFixed(2) }}&deg;C
              </p>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon class="tempicon">
              <v-icon>mdi-thermometer-low</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="moretemp">
              <p class="font-weight-bold">
                Lowest temp:
                {{ (currentWeather.main.temp_min - 273.15).toFixed(2) }}&deg;C
              </p>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card>
      <v-card class="d-flex justify-center ma-1" style="width: 50%" outlined>
        <div id="chart">
          <apexchart
            type="line"
            :options="options"
            :series="series"
            height="100%"
            :width="widthApexCharts"
          ></apexchart>
        </div>
      </v-card>
    </div>

    <v-card class="d-flex ma-2" outlined> 5 days forecast</v-card>

    <div class="d-flex flex-row ma-2" style="height: 350px">
      <v-img v-bind:src="'https://a.tile.openstreetmap.org/2/2/1.png'"></v-img>
      <v-img v-bind:src="'https://a.tile.openstreetmap.org/2/3/1.png'"></v-img>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import ApiClient from "../api/ApiClient";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

export interface DataType {
  currentWeather: any | null;
  forecastWeather: any | null;
}

export default Vue.extend({
  data(): DataType {
    return {
      currentWeather: null,
      forecastWeather: null,
    };
  },
  async mounted() {
    this.currentWeather = await ApiClient.getCurrentWeather("Tokyo,jp");
    this.forecastWeather = await ApiClient.getForecastWeather("Tokyo,jp");
  },
  computed: {
    options() {
      return {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          title: {
            text: "Hour",
          },
        },
        yaxis: {
          title: {
            text: "Temperature",
          },
          min: 5,
          max: 40,
        },
        dataLabels: {
          enabled: true,
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        title: {
          text: "Forecast Average Temperature",
          align: "left",
        },
      };
    },
    chartData(): number[] {
      const item = this.forecastWeather;
      console.log(item);
      // const data = [10, 20, 30, 40]
      const data = item.list.map((i: any) => i.main.temp);
      // const data = [item.list[0].main.temp];
      return data;
    },
    series(): { name: string; data: number[] }[] {
      return [
        {
          name: "Average Temperature",
          data: this.chartData,
        },
      ];
    },
    widthApexCharts() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "50%";
        case "sm":
          return "100%";
        case "md":
          return "150%";
        case "lg":
          return "160%";
        case "xl":
          return "200%";
      }
    },
  },
  methods: {
    getWeatherIconUrl(iconId: string): string {
      return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    },
  },
});
</script>

<style scoped>
.averagetemp {
  text-align: center;
  font-size: 50px;
}
.moretemp {
  margin-top: -2%;
}
.tempicon {
  margin-left: 2%;
  margin-top: 0;
}
.chart {
  max-width: 650px;
  margin: 35px auto;
}
</style>