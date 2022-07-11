<template>
  <div>
    <br />
    <div style="position: relative">
      <v-subheader style="font-size: 20px">My Toolboxes</v-subheader>
      <div style="z-index: 10; position: absolute; bottom: -33%; right: 0">
        <v-btn fab x-small class="tb-mngt-btn">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab x-small class="tb-mngt-btn">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>

    <v-list>
      <v-list-item-group v-model="selectedTbx" color="primary">
        <v-list-item v-for="(tbx) in $store.getters.getToolboxes" :key="tbx.id">
          <v-list-item-content>
            <v-list-item-title v-text="tbx.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "ToolBoxes",
  computed:{
    toolboxes: function () {
      return this.$store.getters.getToolboxes;
    },
    selectedTbx: {
      get () {
        return this.$store.getters.getSelectedToolboxIdx
      },
      set (value) {
        this.$store.commit('updateSelectedToolbox', value)
      }
    }
  }
};
</script>
<style scoped>
.tb-mngt-btn {
  margin-right: 10px;
  border: 1px solid;
  border-color: white;
}
</style>
