<template>
  <div class="search">
    <Input v-model="query" search placeholder="Find something good.." />
  </div>
</template>

<script>
import { Input } from "view-design";
export default {
  name: "Search",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  components: {
    Input
  },
  data() {
    return {
      query: ""
    };
  },
  watch: {
    query() {
      this.$emit("search", this.query);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search {
  margin-top: 10px;
  width: 500px;
}
</style>
