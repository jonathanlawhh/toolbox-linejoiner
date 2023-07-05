<template>
  <div>
    <v-row>
      <v-col cols="12">
        <p>{{ total_lines }} lines | {{ total_dup }} duplicate/s <span v-if="remove_duplicates && total_dup > 0"> removed</span>
        </p>
      </v-col>
      <v-col cols="12" md="4" lg="5">
        <v-textarea rows="12" no-resize variant="outlined" label="Input" v-model='input_data'
                    @change="joinText" color="primary" clearable></v-textarea>
      </v-col>

      <v-col cols="12" md="4" lg="5">
        <v-textarea rows="12" no-resize label="Output" v-model='output_data' variant="outlined"
                    bg-color="grey-lighten-4" color="secondary" readonly></v-textarea>
      </v-col>

      <v-col cols="12" md="4" lg="2">
        <v-card variant="tonal">
          <v-card-title>History</v-card-title>
          <v-card-item>
            <v-row style="height: 270px; overflow-y: scroll">
              <v-col cols="12" v-for="(h, i) in history" :key="i">
                <v-text-field density="compact" variant="outlined" :model-value="h" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>Configuration</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="12">
                  <h3>For each item configuration</h3>
                </v-col>
                <v-col cols="4" md="4" lg="2">
                  <v-text-field label="Delimiter" variant="outlined" v-model="delim" @change="joinText"
                                color="primary"></v-text-field>
                </v-col>
                <v-col cols="4" md="2" lg="1">
                  <v-text-field label="Start with" variant="outlined" v-model="each_delim_start"
                                @change="joinText" color="secondary"></v-text-field>
                </v-col>
                <v-col cols="4" md="2" lg="1">
                  <v-text-field label="End with" variant="outlined" v-model="each_delim_end"
                                @change="joinText" color="secondary"></v-text-field>
                </v-col>

                <v-col cols="12"></v-col>

                <v-col cols="6" md="3" lg="2">
                  <v-text-field label="Substring start position" variant="outlined" v-model="substr_start"
                                @change="joinText" color="primary"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" lg="2">
                  <v-text-field label="Substring end position" variant="outlined" v-model="substr_end"
                                @change="joinText" color="secondary"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <h3>Output configuration</h3>
                </v-col>
                <v-col cols="6" md="2" lg="1">
                  <v-text-field label="Start with" variant="outlined" v-model="delim_start"
                                @change="joinText" color="primary"></v-text-field>
                </v-col>
                <v-col cols="6" md="2" lg="1">
                  <v-text-field label="End with" variant="outlined" v-model="delim_end"
                                @change="joinText" color="primary"></v-text-field>
                </v-col>

                <v-col cols="6" md="3" lg="2">
                  <v-checkbox label="Sort output" v-model="sort_output" @change="joinText"
                              color="secondary"></v-checkbox>
                </v-col>

                <v-col cols="6" md="3" lg="2">
                  <v-checkbox label="Remove duplicates" v-model="remove_duplicates" @change="joinText"
                              color="secondary"></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <h3>Quick settings</h3>
                </v-col>
                <v-col cols="12">
                  <v-btn variant="outlined" class="ma-2" @click="setConfigDef">DEFAULT {A;B}</v-btn>
                  <v-btn variant="outlined" class="ma-2" @click="setConfigSQL">SQL IN ('A','B')</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-snackbar
        v-model="snackbar"
    >
      {{ snackbar_text }}

      <template v-slot:actions>
        <v-btn
            color="pink"
            variant="text"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {event} from 'vue-gtag'

export default {
  data: () => ({
    input_data: null,
    output_data: null,
    total_dup: 0,
    delim: ';',
    total_lines: 0,
    delim_start: '{',
    delim_end: '}',
    sort_output: true,
    remove_duplicates: true,
    each_delim_start: '',
    each_delim_end: '',
    substr_start: 0,
    substr_end: 0,
    snackbar: false,
    snackbar_text: 'Copied to clipboard',
    history: []
  }),

  methods: {
    joinText() {
      if (this.input_data) {
        let t = this.input_data.trim().split('\n')
        t = t.map((s) => {
          return s.trim()
        })

        // Remove duplicates
        let unique_input = []
        let total_dup = 0
        t.forEach((el) => {
          // If there is a duplicate and remove duplicate is true, do nothing
          // Else just add the remaining
          if (unique_input.includes(el)) {
            total_dup++
            !this.remove_duplicates && unique_input.push(el)
          } else {
            unique_input.push(el)
          }
        });

        for (let i = 0; i < unique_input.length; i++) {
          if (this.substr_start > 0 || this.substr_end > 0) {
            unique_input[i] = unique_input[i].substring(this.substr_start, this.substr_end)
          }

          unique_input[i] = this.each_delim_start ? this.each_delim_start + unique_input[i] : unique_input[i]
          unique_input[i] = this.each_delim_end ? unique_input[i] + this.each_delim_end : unique_input[i]
        }

        this.sort_output && unique_input.sort()

        let out = unique_input.join(this.delim)
        out = this.delim_start ? this.delim_start + out : out
        out = this.delim_end ? out + this.delim_end : out

        this.total_lines = t.length
        this.output_data = out
        this.total_dup = total_dup

        // If history has such value, no need to add again to reduce history
        !this.history.includes(out) && this.history.unshift(out)

        navigator.clipboard.writeText(out)
        this.snackbar = true
      } else {
        this.output_data = ''
        this.total_dup = 0
        this.total_lines = 0
      }
    },
    setConfigDef() {
      this.each_delim_start = ""
      this.each_delim_end = ""
      this.delim_start = '{'
      this.delim_end = '}'
      this.delim = ';'

      this.joinText()
      event('configuration_change', {
        'config_name': 'default'
      })
    },
    setConfigSQL() {
      this.each_delim_start = "'"
      this.each_delim_end = "'"
      this.delim_start = '('
      this.delim_end = ')'
      this.delim = ','

      this.joinText()
      event('configuration_change', {
        'config_name': 'sql_in'
      })
    }
  }
}
</script>