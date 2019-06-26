<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>{{patient.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="teal" @click="$router.push({ path: '/'})">
        <v-icon>keyboard_arrow_left</v-icon>Back
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="data" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.temp }}</td>
        <td class="text-xs-center">{{ props.item.heartrate }}</td>
        <td class="text-xs-center">{{ props.item.timestamp }}</td>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "center",
          sortable: false,
          value: "name"
        },

        {
          text: "Tempreture",
          align: "center",
          sortable: false,
          value: "temp"
        },
        {
          text: "Heartrate",
          align: "center",
          sortable: false,
          value: "heartrate"
        },
        {
          text: "Timestamp",
          align: "center",
          sortable: false,
          value: "timestamp"
        }
      ],
      data: [],
      patient: {}
    };
  },
  methods: {
    get_patient() {
      let id = this.$route.params.id;
      this.patient = {};
      if (parseInt(id)) {
        let endpoint = `api/patients/${id}/`;
        axios
          .get(endpoint)
          .then(response => {
            this.patient = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    get_history() {
      let id = this.$route.params.id;
      this.data = [];
      if (parseInt(id)) {
        let endpoint = `api/patients/${id}/history/`;
        axios
          .get(endpoint)
          .then(response => {
            this.data = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    this.get_patient();
    this.get_history();
  }
};
</script>