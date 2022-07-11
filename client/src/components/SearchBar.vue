<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    color="white"
    cache-items
    class="mx-4"
    flat
    hide-no-data
    hide-details
    item-text="txt"
    item-value="id"
    label="Search For a Tool...(Ctrl+F)"
    placeholder="Start typing to Search"
    solo-inverted
    return-object
  ></v-autocomplete>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    // fields() {
    //   if (!this.model) return [];

    //   return Object.keys(this.model).map((key) => {
    //     return {
    //       key,
    //       value: this.model[key] || "n/a",
    //     };
    //   });
    // },
    items() {
      return this.entries.map((entry) => {
        const description =
          entry.description.length > this.descriptionLimit
            ? entry.description.slice(0, this.descriptionLimit) + "..."
            : entry.description;
        return Object.assign({}, entry, { description, txt:entry.name+": "+entry.description });
      });
    },
  },

  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      // fetch("https://api.publicapis.org/entries")
      //   .then((res) => res.json())
      //   .then((res) => {
      //     this.entries = res.entries;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => (this.isLoading = false));
      this.entries = this.$store.getters.getTools
      this.isLoading = false
    },
  },
};
</script>
