<template>
  <div style="min-height: 95vh; background-color: #F6F6F2">
    <NuxtPage />
  </div>
  <div style="min-height: 5vh; min-width: 100vw; background-color:  #eeeee9">
    <v-row>
      <v-col offset="8"></v-col>
      <v-col cols="4" class="text-right">
        <v-btn variant="text" to="/" class="mr-8">App</v-btn>
        <v-btn variant="text" to="about" class="mr-8">About</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
