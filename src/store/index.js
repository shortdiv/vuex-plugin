import Vuex from "vuex";
import Vue from "vue";
// remember to import plugin

Vue.use(Vuex);

export default new Vuex.Store({
  // add plugin here //
  plugins: [],
  state: {
    machineName: "Wash Bucket",
    lastServiced: new Date()
  },
  getters: {
    serviceDate(state) {
      return state.lastServiced.toLocaleString("default", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    },
    serviceTime(state) {
      return state.lastServiced.toLocaleString("default", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
      });
    }
  },
  actions: {
    serviceMachine({ commit }) {
      commit("updateServiceDate", new Date());
    },
    fetchLastServicedDate({ commit }) {
      let obj = JSON.parse(localStorage.getItem("last_serviced"));
      if (new Date(obj.persistFor) < new Date()) {
        commit("updateServiceDate", new Date());
      } else {
        commit("updateServiceDate", new Date(obj.dateTime));
      }
    }
  },
  mutations: {
    updateServiceDate(state, payload) {
      state.lastServiced = payload;
    }
  }
});
