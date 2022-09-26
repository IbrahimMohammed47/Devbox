<template>
  <div v-if="selectedToolbox" style="position: relative; width: 100%; height: 100%">
    <v-speed-dial
      v-model="fab"
      style="position: absolute"
      right
      bottom
      direction="top"
      transition="scale"
    >
      <template v-slot:activator>
        <v-btn large v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-tooltip disabled left :value="true">
        <v-btn fab dark small slot="activator">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <span>Add Tool</span>
      </v-tooltip>
      <!-- <v-tooltip disabled left :value="true">
        <v-btn fab dark small slot="activator">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <span>Add Category</span>
      </v-tooltip> -->
    </v-speed-dial>
    <v-expansion-panels>
      <v-expansion-panel v-for="(category, i) in categories" :key="i">
        <v-expansion-panel-header> {{ category }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="toolHolder">
            <ToolComponent
              class="toool"
              v-for="(tool) in selectedToolbox.tools.filter((t) => t.category == category)"
              :tool="tool"
              :key="tool.id"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import ToolComponent from "./ToolComponent.vue";
export default {
  name: "ToolBoxViewer",
  components: { ToolComponent },
  data: () => ({
    fab: false,
    // tools: [
    //   {
    //     name: "Mailer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryA",
    //   },
    //   {
    //     name: "Diagrammer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryB",
    //   },
    //   {
    //     name: "Storage",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryC",
    //   },
    //   {
    //     name: "Wireframer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryB",
    //   },
    //   {
    //     name: "API",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryB",
    //   },
    //   {
    //     name: "Regexer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryC",
    //   },
    //   {
    //     name: "Regexer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryC",
    //   },
    //   {
    //     name: "Regexer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryC",
    //   },
    //   {
    //     name: "Regexer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryC",
    //   },
    //   {
    //     name: "Regexer",
    //     description: "Greyhound divisely hello coldly fonwderfully",
    //     category: "categoryC",
    //   },
    // ],
  }),
  computed: {
    selectedToolbox:function(){
      return this.$store.getters.getSelectedToolbox
    },
    categories: function () {
      return [...new Set(this.selectedToolbox.tools.map((t) => t.category))];
    },
  },
};
</script>
<style scoped>
.toolHolder {
  display: absolute;
  background-color: #292424;
}
.toool {
  margin: 10px !important;
  float: left;
}
</style>
