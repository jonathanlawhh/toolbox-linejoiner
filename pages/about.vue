<template>
<div>
  <v-row style="min-height: 75vh; background-color: white">
    <v-col cols="12" class="text-center" align-self="center" justify="center">
      <h1 class="brand-text main-text">Line Joiner</h1>
      <h2 class="brand-text secondary-text">Many lines, become one line</h2>
      <v-btn class="ma-8 brand-text" size="x-large" to='/'>go to app</v-btn>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  name: "about"
}
</script>

<style scoped>
.brand-text {
  background: linear-gradient(240deg, #d0368a 0%, #708ad4 99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-text {
  font-size: 4em;
}

.secondary-text {
  font-size: 2.5em;
}
</style>