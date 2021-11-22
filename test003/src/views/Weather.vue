<!--
<template>
  <div>
    <v-card raised width="500" class="ma-2">
        <v-img :src="require('../assets/warm-bg.jpg')" height="100" class="white--text align-end">
            <v-card-title class="headline">Tokyo</v-card-title>
        <v-card-subtitle>Japan</v-card-subtitle>
        </v-img>
        <v-divider class="mx-3"></v-divider>
        <v-card-text>
            <div class="body-1 mb-1">
                <p class="text-h4">17℃</p>
            </div>
        </v-card-text>
    </v-card>
    <v-container class="mt-12">
        <v-card class="mt-6" justify="top right">
          <v-date-picker v-model="selectDate" color="green" locale="ja"></v-date-picker>
         <v-col cols=12>
             <div>{{ selectDate }}</div>
          </v-col>
        </v-card>
    </v-container>
  </div>
<div id="app">
  <v-app id="inspire">
    <v-card
      class="mx-auto my-5"
      width="400"
      elevation="15"
      outlined
    >
      <v-list-item two-line>
        <v-img :src="require('../assets/warm-bg.jpg')" height="80" class="white--text align-end">
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            San Francisco
          </v-list-item-title>
          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
        </v-list-item-content>
        </v-img>
      </v-list-item>
  
      <v-card-text>
        <v-row align="center">
          <v-col
            class="text-h2"
            cols="6"
          >
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
  
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
      </v-list-item>
  
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>
  
      <v-slider
        v-model="time"
        :max="6"
        :tick-labels="labels"
        class="mx-4"
        ticks
      ></v-slider>
  
      <v-list class="transparent">
        <v-list-item
          v-for="item in forecast"
          :key="item.day"
        >
          <v-list-item-title>{{ item.day }}</v-list-item-title>
  
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
  
          <v-list-item-subtitle class="text-right">
            {{ item.temp }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-btn text>
          Full Report
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-spacer></v-spacer>
    <v-container>
     <v-card
      class="mx-auto"
      max-width="400"
    >
        <v-date-picker v-model="selectDate" color="green" locale="ja" class="mx-auto"></v-date-picker>
         <v-col cols=12>
             <div>{{ selectDate }}</div>
          </v-col>
     </v-card>
    </v-container>
  </v-app>
</div>
</template>

-->
<template>
  <div id="app">
    <v-app id="inspire">
      <v-container class="grey lighten-5">
        <v-row>
          <v-col>
            <v-card
              class="pa-2"
              outlined
              tile
              height="350"
              :img="require('@/assets/sky.jpeg')"
            >
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

              <v-divider></v-divider>

              <v-row align="center">
                <v-col>
                  <p class="averagetemp">
                    {{ (item.main.temp - 273.15).toFixed(2) }}&deg;C
                  </p>
                </v-col>
                <v-col>
                  <v-img
                    src="@/assets/sun.png"
                    alt="Sunny image"
                    class="weathericon"
                    height="100"
                    width="100"
                  ></v-img>
                </v-col>
              </v-row>

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
            </v-card>
          </v-col>
          <v-col>
            <v-card class="pa-2" outlined tile height="350">
              <h2 class="center">Map</h2>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-card class="home" outlined tile height="350">
            <h2 class="center">3 hour forecast</h2>
          </v-card>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<style>
.center {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.home {
  width: 100%;
}
.towninfo {
  width: 100%;
  top: 50%;
  text-align: center;
  font-size: 18px;
}
.weathericon {
  margin-top: 5%;
  margin-left: 20%;
}
.averagetemp {
  text-align: center;
  margin-top: 10%;
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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosError } from "axios";
import "@mdi/font/css/materialdesignicons.css";

@Component
export default class GetTownNameClient extends Vue {
  private item: any[] = new Array<any>();

  private created() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&APPID=681fa0c699b30f64bfb06f2a7e615ee4"
      )
      .then((response) => {
        this.item = response.data;
      })
      .catch((ex: AxiosError) => {});
  }
}
</script>
