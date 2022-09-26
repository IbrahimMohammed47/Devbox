

<template>
  <v-app>
    <v-app-bar app clipped-left>
      <h1>DEV-BOX</h1>
      <SearchBar style="transform: translate(20%); width: 40%" />
      <v-spacer></v-spacer>

      <v-avatar color="white" size="52">
        <v-img
          :src="`https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`"
        />
      </v-avatar>
    </v-app-bar>

    <v-navigation-drawer app permanent clipped>
      <ToolBoxes />
    </v-navigation-drawer>

    <v-main>
      <ToolBoxViewer />
    </v-main>
  </v-app>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import ToolBoxes from "./ToolBoxes.vue";
import ToolBoxViewer from "./ToolBoxViewer.vue";
export default {
  name: "MainComponent",
  components: { SearchBar, ToolBoxes, ToolBoxViewer },
  data: () => ({}),
};
</script>