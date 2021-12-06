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
              {{ currentWeather.main.temp.toFixed(2) }}&deg;C
            </p>
          </div>
          <div class="d-flex align-center ma-1" style="width: 50%" outlined>
            <v-img
              v-bind:src="getWeatherIconUrl(currentWeather.weather[0].icon)"
              alt="Sunny image"
              height="100"
              width="100"
              contain
            ></v-img>
          </div>
        </div>

        <div class="d-flex flex-column ma-1">
          <v-list-item>
            <!--v-list-item-icon class="tempicon">
              <v-icon>mdi-thermometer-high</v-icon>
            </v-list-item-icon-->
            <v-list-item-content class="moretemp">
              <p class="font-weight-bold">
                Feeling likes
                {{ currentWeather.main.feels_like.toFixed(2) }}&deg;C.
                {{
                  currentWeather.weather[0].description
                    .charAt(0)
                    .toUpperCase() +
                  currentWeather.weather[0].description.slice(1)
                }}. Wind speed is {{ currentWeather.wind.speed }}m/s.
              </p>
            </v-list-item-content>
          </v-list-item>

          <!--v-list-item>
            <v-list-item-icon class="tempicon">
              <v-icon>mdi-thermometer-low</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="moretemp">
              <p class="font-weight-bold">
                Lowest temp:
                {{ currentWeather.main.temp_min.toFixed(2) }}&deg;C
              </p>
            </v-list-item-content>
          </v-list-item-->
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

    <div class="ma-2" v-if="currentWeather !== null">
      <v-img
        v-bind:src="
          getMapUrl(currentWeather.coord.lon, currentWeather.coord.lat)[0]
        "
      ></v-img>
      <!--v-img
        v-bind:src="
          getMapUrl(currentWeather.coord.lon, currentWeather.coord.lat)[1]
        "
      ></v-img-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import ApiClient from "../api/ApiClient";
import VueApexCharts from "vue-apexcharts";
import { ApexOptions } from "apexcharts";
import 'leaflet/dist/leaflet.css';

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

export interface DataType {
  city: string;
  currentWeather: any | null;
  forecastWeather: any | null;
  forecastDataNum: number;
}

export default Vue.extend({
  data(): DataType {
    return {
      city: "",
      currentWeather: null,
      forecastWeather: null,
      forecastDataNum: 9,
    };
  },

  async mounted(): Promise<void> {
    this.city = this.$route.query.city as string;
    this.currentWeather = await ApiClient.getCurrentWeather(this.city);
    this.forecastWeather = await ApiClient.getForecastWeather(this.city);
  },
  computed: {
    options(): ApexOptions {
      return {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: this.chartCategory,
          title: {
            text: "Time(Hour)",
          },
        },
        yaxis: {
          title: {
            text: "Temperature(°C)",
          },
          min: this.minTemp,
          max: this.maxTemp,
        },
        dataLabels: {
          enabled: true,
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        title: {
          text: "Forecast Temperature(24 hours)",
          align: "left",
        },
      };
    },
    minTemp(): number {
      return Math.min(...this.chartData) - 2;
    },
    maxTemp(): number {
      return Math.max(...this.chartData) + 2;
    },
    chartCategory(): string[] {
      const item = this.forecastWeather;
      console.log(item);
      console.log(item.city.timezone / 60 / 60);
      const category = item.list
        .map(
          (i: any) =>
            `${String(
              (Number(i.dt_txt.substr(11, 2)) + item.city.timezone / 3600) % 24
            )}:00`
        )
        .slice(0, this.forecastDataNum);
      return category;
    },
    chartData(): number[] {
      const item = this.forecastWeather;
      console.log(item);
      const data = item.list
        .map((i: any) => i.main.temp)
        .slice(0, this.forecastDataNum);
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
    widthApexCharts(): string {
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
    getParams(params: string): { [key: string]: string } {
      const paramsArray = params.slice(1).split("&");
      const paramsObject: { [key: string]: string } = {};
      paramsArray.forEach((param) => {
        paramsObject[param.split("=")[0]] = param.split("=")[1];
      });
      return paramsObject;
    },
    getMapUrl(lon: number, lat: number): string[] {
      const xyz = this.getTileXYZ(lon, lat);
      return [
        `https://a.tile.openstreetmap.org/${xyz[2]}/${xyz[0]}/${
          xyz[1]
        }.png`,
        `https://a.tile.openstreetmap.org/${xyz[2]}/${xyz[0]}/${xyz[1]}.png`,
      ];
    },
    getTileXYZ(lon: number, lat: number): number[] {
      console.log("lon lan");
      console.log(lon);
      console.log(lat);
      const zoom = 2;
      const n = 2 * zoom;
      const xtile = n * ((lon + 180) / 360);
      const lat_rad = (lat * Math.PI) / 180;
      const sec = 1 / Math.cos(lat_rad);
      const ytile = (n * (1 - Math.log(Math.tan(lat_rad) + sec) / Math.PI)) / 2;
      console.log(Math.floor(xtile));
      console.log(Math.floor(ytile));
      return [Math.floor(xtile), Math.floor(ytile), zoom];
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