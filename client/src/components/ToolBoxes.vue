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
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "ToolBoxes",
  data: () => ({
    selectedItem: 0,
    items: [
      { text: "Default" },
      { text: "Developer" },
      { text: "Designer" },
      { text: "Custom" },
      { text: "TbxNice" },
    ],
  }),
};
</script>
<style scoped>
.tb-mngt-btn {
  margin-right: 10px;
  border: 1px solid;
  border-color: white;
}
</style>
