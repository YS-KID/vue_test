<template>
  <div>
    <div class="d-flex flex-row ma-1" v-if="forecastWeather !== null">
      <v-card
        class="d-flex flex-column ma-1"
        style="width: 200"
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
        </div>
      </v-card>
      <v-card class="d-flex justify-center ma-1" style="width: 200" outlined>
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

    <div class="d-flex flex-row ma-1" v-if="forecastWeather !== null">
      <v-card class="d-flex ma-2" style="width: 400" :img="require('@/assets/sky_2.jpg')" outlined>
        <v-container>
          <v-row :justify="center">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  Weather forecast (every 6 hours)
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-row>
          <v-row :justify="center">
            <v-col v-for="n in 7" :key="n">
              <v-card color="transparent">
                <v-img
                  v-bind:src="
                    getWeatherIconUrl(
                      forecastWeather.list[n * 2].weather[0].icon
                    )
                  "
                  alt="Sunny image"
                  height="100"
                  width="100"
                  contain
                ></v-img>
                <p class="text-center">
                  {{ getDay(forecastWeather.list[n * 2].dt_txt) }}
                </p>
                <p class="text-center">
                  {{ getHour(forecastWeather.list[n * 2].dt_txt) }}
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-col> </v-col>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import ApiClient from "../api/ApiClient";
import VueApexCharts from "vue-apexcharts";
import { ApexOptions } from "apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

export interface DataType {
  city: string;
  currentWeather: any | null;
  forecastWeather: any | null;
  forecastDataNum: number;
  month: string[];
}

export default Vue.extend({
  data(): DataType {
    return {
      city: "",
      currentWeather: null,
      forecastWeather: null,
      forecastDataNum: 9,
      month: [
        "Jan. ",
        "Feb. ",
        "Mar. ",
        "Apr. ",
        "May ",
        "June ",
        "July ",
        "Aug. ",
        "Sept.",
        "Oct. ",
        "Nov. ",
        "Dec. ",
      ],
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
          text: "Temperature forecast (24 hours)",
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
      category[0] = "now";
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
    getDay(date: string): string {
      console.log(date);
      return `${this.month[Number(date.substr(5, 2)) - 1]}${date.substr(8, 2)}`;
    },
    getHour(date: string): string {
      return `${date.substr(11, 5)}`;
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