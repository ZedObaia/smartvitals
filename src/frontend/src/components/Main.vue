<template>
  <v-container grid-list-xs>
    <v-toolbar flat color="white">
      <v-toolbar-title>Patients</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click="addPatientDialog=true;">Add Patient</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="patients" :expand="expand" item-key="name">
      <template v-slot:items="props">
        <tr
          @click="resetChart();props.expanded = !props.expanded;joinRoom(patients.indexOf(props.item));"
        >
          <td class="text-xs-center">{{props.item.id}}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.age }}</td>
          <td class="text-xs-center">{{ props.item.gender }}</td>
          <td class="text-xs-center">{{ props.item.heartrate }}</td>
          <td class="text-xs-center">{{ props.item.temp }}</td>
          <td class="text-xs-center">
            <v-btn color="teal" @click="$router.push({ path: `/records/${props.item.id}`})
">
              <v-icon>history</v-icon>History
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-container grid-list-xs>
            <div id="chart">
              <apexchart
                ref="realtimeChart"
                type="line"
                height="350"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </v-container>
        </v-card>
      </template>
    </v-data-table>
    <v-layout row justify-center>
      <v-dialog v-model="addPatientDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Patient Data</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field label="Patient Name*" required v-model="newPatient.name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field type="number" label="age" v-model="newPatient.age"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12>
                  <v-select
                    :items="['Male', 'Female']"
                    label="Gender*"
                    required
                    v-model="newPatient.gender"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="addPatientDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addPatient">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";

var lastDate = 0;
var data = [];

function getDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    data.push({
      x,
      y
    });
    lastDate = baseval;
    baseval += 86400 / 24;
    i++;
  }
}

function updateChart(y) {
  let newDate = lastDate + 86400 / 24;
  lastDate = newDate;
  data.push({
    x: newDate,
    y: y
  });
}
getDayWiseTimeSeries(new Date().getTime(), 1, {
  min: 10,
  max: 90
});

function getNewSeries(baseval, yrange) {
  var newDate = baseval + 86400 / 24;
  lastDate = newDate;
  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  });
}

function resetData() {
  if (data.length > 500) data = data.slice(data.length - 400, data.length);
  // data = data
}
export default {
  data: () => ({
    expand: false,
    addPatientDialog: false,
    newPatient: {},
    headers: [
      {
        text: "#",
        align: "center",
        sortable: false,
        value: "id"
      },
      {
        text: "Name",
        align: "center",
        sortable: false,
        value: "name"
      },
      {
        text: "Age",
        align: "center",
        sortable: false,
        value: "age"
      },
      {
        text: "Gender",
        align: "center",
        sortable: false,
        value: "gender"
      },
      {
        text: "Heart Rate",
        align: "center",
        sortable: false,
        value: "heartrate"
      },
      {
        text: "Tempreture",
        align: "center",
        sortable: false,
        value: "temp"
      },
      {
        text: "",
        align: "center",
        sortable: false,
        value: "history"
      }
    ],
    message: "",
    logs: [],
    patients: [],
    status: "disconnected",
    currentPatient: {},
    chartOptions: {
      chart: {
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 20
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2
      },

      title: {
        text: `EMG Signal`,
        align: "left"
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        range: 777600,
        labels: {
          show: false
        }
      },
      yaxis: {
        max: 5,
        min: 0,
        forceNiceScale: true
      },
      legend: {
        show: false
      }
    },
    series: [
      {
        data: data.slice()
      }
    ]
  }),
  computed: {
    webSocketConnected: function() {
      return this.$socket.isConnected;
    }
  },
  watch: {
    webSocketConnected: function(connected, two) {
      if (connected) {
        for (let index = 0; index < this.patients.length; index++) {
          const id = this.patients[index].id;
          let sub = this.subscribePatient(id);
        }
      }
    }
  },
  methods: {
    getPatients: function() {
      axios
        .get("api/patients/")
        .then(response => {
          this.patients = response.data;

          for (let index = 0; index < this.patients.length; index++) {
            const id = this.patients[index].id;
            let sub = this.subscribePatient(id);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // sendMessage: function() {
    //   console.log("sending");
    //   this.$socket.sendObj(
    //     JSON.stringify({
    //       command: "send",
    //       patient: this.currentPatient.id,
    //       message: this.message
    //     })
    //   );
    //   this.message = "";
    // },
    messageReceived: function(data) {
      let new_msg = JSON.parse(data.data);
      if (new_msg.type == "message") {
        let patient_id = new_msg.room;
        let patient = this.patients.filter(function(element) {
          return element.id === patient_id;
        });
        patient = patient[0];
        try {
          patient.temp = new_msg.message.temp;
        } catch (error) {
          this.getPatients();
        }
        patient.temp = new_msg.message.temp;
        patient.heartrate = new_msg.message.heartrate;
        if (
          // parseFloat(new_msg.message.emg) &&
          patient_id == this.currentPatient.id
        ) {
          let emg = JSON.parse(new_msg.message.emg);
          for (let index = 0; index < emg.length; index++) {
            const element = emg[index];
            updateChart(element);
          }
        }
      }
    },
    joinRoom: function(index) {
      if (this.currentPatient.id === this.patients[index].id) {
        this.currentPatient = {};
      } else {
        this.currentPatient.id = this.patients[index].id;
        this.currentPatient.name = this.patients[index].name;
        this.currentPatient.doctor = this.patients[index].doctor;
      }
    },
    resetChart: function() {
      data = [];
      let emg = [];
      if (this.currentPatient.id) {
        axios
          .get(`api/patients/${this.currentPatient.id}/`)
          .then(response => {
            emg = JSON.parse(response.data.emg);
            getDayWiseTimeSeries(new Date().getTime(), 1, {
              min: 10,
              max: 90
            });
            for (let index = 0; index < emg.length; index++) {
              const element = emg[index];
              console.log(emg[index]);
              updateChart(element);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (this.$refs.realtimeChart) {
          this.$refs.realtimeChart.updateSeries(
            [
              {
                data
              }
            ],
            false,
            true
          );
        }
      }
    },
    addPatient: function() {
      let endpoint = "api/patients/";
      let data = {};
      data.name = this.newPatient.name;
      data.age = this.newPatient.age;
      if (this.newPatient.gender === "Male") data.gender = 0;
      else if (this.newPatient.gender === "Female") data.gender = 1;
      let config = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      };
      axios
        .post(endpoint, data, config)
        .then(response => {
          if (response.data.gender === 0) response.data.gender = "Male";
          else response.data.gender = "Female";
          this.patients.push(response.data);
          this.newPatient = {};
          this.addPatientDialog = false;
          this.subscribePatient(response.data.id);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    subscribePatient: function(id) {
      if (this.$store.state.socket.isConnected) {
        this.$socket.sendObj(
          JSON.stringify({
            command: "join",
            patient: id
          })
        );
        return true;
      }
      return false;
    },
    intervals: function() {
      var me = this;
      window.setInterval(function() {
        if (me.$refs.realtimeChart)
          me.$refs.realtimeChart.updateSeries([
            {
              data: data
            }
          ]);
      }, 20);

      // every 60 seconds, we reset the data to prevent memory leaks
      window.setInterval(function() {
        resetData();
        if (me.$refs.realtimeChart) {
          me.$refs.realtimeChart.updateSeries(
            [
              {
                data
              }
            ],
            false,
            true
          );
        }
      }, 60000);
    },
    leaveAllRooms: function() {
      for (let index = 0; index < this.patients.length; index++) {
        const id = this.patients[index].id;
        this.$socket.sendObj(
          JSON.stringify({
            command: "leave",
            patient: id
          })
        );
      }
    }
  },
  mounted() {
    this.intervals();
  },
  created() {
    this.getPatients();
    this.$socket.onmessage = data => this.messageReceived(data);
  },
  beforeDestroy() {
    // this.leaveAllRooms();
  }
};
</script>

<style>
</style>
