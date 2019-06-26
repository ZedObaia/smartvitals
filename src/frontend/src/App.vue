<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SMART</span>
        <span class="font-weight-light">Vitals</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="accounts/logout/">
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",
  components: {
    Main
  },
  data() {
    return {
      //
    };
  }
};
</script>
