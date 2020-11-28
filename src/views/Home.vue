<template>
  <div class="vld-parent">
    <Search @search="query" />
    <List :listData="filteredData" />
  </div>
</template>

<script>
// Import stylesheet
import List from "../components/List.vue";
import Search from "../components/Search.vue";
import { mapMutations } from "vuex";
import { APIService } from "../ApiService.js";
export default {
  components: {
    List,
    Search
  },
  mounted() {
    this.getDataFromApiCalls();
  },
  data() {
    return {
      listData: [],
      filteredData: []
    };
  },
  methods: {
    ...mapMutations(["set_list", "set_images"]),
    getDataFromApiCalls() {
      this.loading();
      APIService.getBeerCraftData("/beercraft5bac38c.json").then(response => {
        this.loading();
        var list = response.data;
        this.set_list(list);
        APIService.getBeerCraftImages("/beerimages7e0480d.json").then(
          response => {
            var images = response.data;
            this.set_images(images);
            this.mergeData(list, images);
          }
        );
      });
    },
    mergeData(list, images) {
      var newList = list;
      newList.forEach((element, index) => {
        var imageindex = index % 5;
        element["image"] = images[imageindex].image;
      });
      this.listData = newList;
      this.filteredData = newList;
      this.loadingComplete();
    },
    query(param) {
      if (param && param.length > 0) {
        this.loading();
        this.filteredData = this.listData.filter(x =>
          x.name
            .trim()
            .toLowerCase()
            .includes(param.trim().toLowerCase())
        );
      } else {
        this.filteredData = this.listData;
      }
      this.loadingComplete();
    },
    loading() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Pouring beer. Please Wait")
          ]);
        }
      });
    },
    loadingComplete() {
      this.$Spin.hide();
    }
  }
};
</script>
<style>
.vld-parent {
  margin: 0 auto;
  width: 500px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
