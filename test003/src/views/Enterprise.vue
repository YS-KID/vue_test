<template>
  <div>
    <div class="d-flex flex-row ma-1">
      <v-card class="d-flex flex-column ma-1" style="width: 50%" outlined> a</v-card>
      <v-card class="d-flex ma-1" style="width: 50%" outlined> g</v-card>
    </div>

    <v-card class="d-flex ma-2" outlined> e</v-card>
    <v-card class="d-flex ma-2 mt-1" outlined> f</v-card>
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