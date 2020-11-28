<template>
  <div class="list">
    <div class="dataList">
      <List item-layout="vertical">
        <ListItem v-for="item in currentPageData" :key="item.id">
          <ListItemMeta
            :avatar="item.image"
            :title="item.name"
            :description="item.style"
          />
          <template slot="action">
            <li :v-if="item.abv">{{ formattedText("ABV:", item.abv) }}</li>
            <li :v-if="item.ibu">{{ formattedText("IBU:", item.ibu) }}</li>
            <li :v-if="item.ounces">
              {{ formattedText("Ounces:", item.ounces) }}
            </li>
          </template>
        </ListItem>
      </List>
      <Page :total="totalElements" show-total @on-change="pageChangeEvent" />
    </div>
  </div>
</template>

<script>
import { List, ListItem, ListItemMeta } from "view-design";
export default {
  props: {
    listData: {
      default: function() {
        return [];
      }
    }
  },
  components: {
    List,
    ListItem,
    ListItemMeta
  },
  methods: {
    formattedText(label, value) {
      if (!value || value === "") {
        return label + "NA";
      }
      return label + value;
    },
    pageChangeEvent(pageNumber) {
      if (this.listData) {
        var fromDataSequence = (pageNumber - 1) * this.perPageElement;
        var toDataSequence = pageNumber * this.perPageElement;
        this.currentPageData = this.listData.slice(
          fromDataSequence,
          toDataSequence
        );
      }
    }
  },
  data: function() {
    return {
      allPageData: [],
      currentPageNumber: 1,
      currentPageData: [],
      perPageElement: 5,
      totalElements: 0
    };
  },
  watch: {
    listData: {
      handler(newValue) {
        this.allPageData = newValue;
        this.totalElements = newValue.length;
        this.pageChangeEvent(1);
      },
      deep: true
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
</style>
