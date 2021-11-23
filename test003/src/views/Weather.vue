<template>
  <div>
    <div class="d-flex flex-row ma-1">
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
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h5">
                {{ item.sys.country }}
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
              {{ (item.main.temp - 273.15).toFixed(2) }}&deg;C
            </p>
          </div>
          <div class="d-flex align-center ma-1" style="width: 50%" outlined>
            <v-img
              v-bind:src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
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
                {{ (item.main.temp_max - 273.15).toFixed(2) }}&deg;C
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
                {{ (item.main.temp_min - 273.15).toFixed(2) }}&deg;C
              </p>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card>
      <v-card class="d-flex ma-1" style="width: 50%" outlined> graph temp</v-card>
    </div>

    <v-card class="d-flex ma-2" outlined> 5 days forecast</v-card>

    <div class="d-flex flex-row ma-2" style="height:350px">
      <v-img v-bind:src="'https://a.tile.openstreetmap.org/2/2/1.png'"></v-img>
      <v-img v-bind:src="'https://a.tile.openstreetmap.org/2/3/1.png'"></v-img>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import ApiClient from "../api/ApiClient";

export interface DataType {
  item: any | null;
}

export default Vue.extend({
  name: "ProductList",
  data(): DataType {
    return {
      item: null,
    };
  },
  async mounted() {
    this.item = await ApiClient.getCurrentWeather("Tokyo,jp");
    console.log(this.item);
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
</style>