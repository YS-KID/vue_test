<template>
<div id="app">
  <v-app>
    <v-card>
      <v-card-title>都市名をローマ字で入力してください</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="text1"
          label="Town name"
        >
        </v-text-field>
      </v-card-text>
    </v-card>
  </v-app>
</div>
</template>