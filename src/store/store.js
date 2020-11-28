import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    images: []
  },
  mutations: {
    set_list(state, list) {
      state.list = list;
    },
    set_images(state, images) {
      state.images = images;
    }
  }
});
