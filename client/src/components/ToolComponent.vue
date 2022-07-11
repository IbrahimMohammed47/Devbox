<template>
  <v-card class="mx-auto" max-width="340" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Status:&nbsp;
          <v-badge :color="status" />
        </div>

        <v-list-item-title class="text-h5 mb-1"> {{tool.name}} </v-list-item-title>
        <v-list-item-subtitle
          >{{tool.description}}</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined fab small> <v-icon>mdi-open-in-new</v-icon> </v-btn>
      <v-btn outlined fab small> <v-icon>mdi-delete</v-icon> </v-btn>
      <v-spacer></v-spacer>
      <v-rating
        v-model="rating"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        half-increments
        hover
        size="15"
      ></v-rating>
      <span class="grey--text text--lighten-2 text-caption mr-2">
        ({{ ratingC }})
      </span>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "ToolComponent",
  props: ['tool'],
  data: () => ({
  }),
  computed: {
    rating: function(){
      return this.tool.rating_count>0?
        (this.tool.rating_sum / this.tool.rating_count):
        0;
    },
    ratingC: function(){
      return this.tool.rating_count;
    },
    status: function () {
      let statusVal = this.tool.status 
      let colors = { online: "green", unknown: "yellow", down: "red" };
      return colors[statusVal];
    },
  },
};
</script>
<style scoped></style>
