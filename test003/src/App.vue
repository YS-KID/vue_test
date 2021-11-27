<!--
<template>
  <div>
    <v-card class="mx-auto" max-width="374">
      <v-img
        height="250"
        src="https://images.unsplash.com/photo-1558486012-817176f84c6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
        gradient="to top, rgba(255,255,255,.4), rgba(255,255,255,.9)"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5">
              CURRENT WEATHER
            </v-list-item-title>
            <v-list-item-subtitle>YYYY-MM-DD</v-list-item-subtitle> // 今日の日付を取ってくる
            <v-list-item-subtitle>TOKYO</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col text-h2 cols="12">
              <v-list-item-subtitle>お天気ステータス</v-list-item-subtitle>
            </v-col>
            <v-col cols="12">
              <v-card-subtitle class="text-h1 temp">温度
                <span class="celcius">&#8451;</span>
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card-text>
      </v-img>
    </v-card>
  </div>
</template>
<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''
    "
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ dateBuilder() }}</div>
          <div class="weather-box">
            <div class="temp">{{ Math.round(weather.main.temp) }}</div>
            <div class="weather">{{ weather.weather[0].main }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      api_key: "aece72db7cd2cb2cd0fb2b79bedc5d44",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        const url = `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`;
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then(this.setResults);
      }
    },
    setResults(data) {
      this.weather = data;
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "montserrat", sans-serif;
}
#app {
  margin: 0 auto;
  max-width: 600px;
  background-image: url("./assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
#app.warm {
  background-image: url("./assets/warm-bg.jpg");
}
main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.location-box .location {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box .date {
  color: white;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  font-style: italic;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: white;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
  color: white;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
-->
<template>
  <v-app>
    <v-navigation-drawer app :value="navBarFlag" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              Town List
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item
            v-for="town in townList"
            :key="town.name"
            :to="town.link"
            @click="city = town.name"
          >
            <v-list-item-icon>
              <v-icon>{{ town.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ town.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon
        @click="navBarFlag = !navBarFlag"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Town Weather</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/select">home</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main :key="city">
      <router-view />
    </v-main>
    <v-footer color="primary" dark app>
      <v-spacer></v-spacer>
      Town Weather
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export interface DataType {
  city: string;
  navBarFlag: boolean;
  townList: any[];
}

export default Vue.extend({
  data(): DataType {
    return {
      city: '東京',
      navBarFlag: false,
      townList: [
        { name: '東京', icon: 'mdi-vuetify', link: '/weather?city=Tokyo' },
        { name: '京都', icon: 'mdi-vuetify', link: '/weather?city=Kyoto' },
        { name: '大阪', icon: 'mdi-vuetify', link: '/weather?city=Osaka' },
        { name: '沖縄', icon: 'mdi-vuetify', link: '/weather?city=Okinawa' },
        { name: '札幌', icon: 'mdi-vuetify', link: '/weather?city=Sapporo' },
        //{name: 'New York', icon: 'mdi-vuetify', link: '/weather?city=New%20York'}
      ],
    };
  },
});
//@Component
//export default class Button extends Vue {
//  public navBarFlag: boolean = false;
//  public townList: any[] = [
//    { name: 'Tokyo', icon: 'mdi-vuetify', link: '/weather' },
//    { name: 'New York', icon: 'mdi-vuetify', link: '/weather' },
//    { name: 'Hong Kong', icon: 'mdi-vuetify', link: '/weather' },
//  ];
//}
</script>