<template>
  <div style="background-color: #F6F6F2">
    <div style="min-height: 94vh;">
      <NuxtPage/>
    </div>
    <div style="min-height: 5vh; min-width: 100vw; background-color:  #eeeee9" class="mt-4">
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn variant="text" to="/" class="mr-8">App</v-btn>
          <v-btn variant="text" to="about" class="mr-8">About</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
