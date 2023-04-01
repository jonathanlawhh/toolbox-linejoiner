<template>
  <v-container>
    <v-row>
      <v-col col='12'>
        <h1>Line Joiner</h1>
        <h2>[Joining each line, one at a time]</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card variant="flat">
          <v-row>
            <v-col cols="12" md="8" lg="9">
              <v-tabs v-model="tab">
                <v-tab :value="i" v-for="i in tabs" :key="i">{{ i }}</v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="12" md="4" lg="3" class="text-right">
              <v-btn size="large"
                     @click="tabs.push('t' + Math.floor(Math.random(0, 1) * 3000).toString()); tab = tabs[tabs.length - 1]"
                     class="ma-2"
                     variant="outlined">+
              </v-btn>
              <v-btn size="large"
                     @click="tabs.length > 1 && (tab = tabs.length > 1 ? tabs[tabs.indexOf(tab) - 1] : tabs[0]); tabs.splice(tabs.indexOf(tab) + 1, 1)"
                     class="ma-2" variant="outlined">-
              </v-btn>
            </v-col>
          </v-row>

          <v-card-text style="min-height: 240px">
            <v-window v-model="tab">
              <v-window-item :value="i" v-for="(i, idx) in tabs" :key="idx">
                <Inputs></Inputs>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tabs: ['Default'],
    tab: '',
    active_tab_name: 1
  }),
}
</script>

