// const persistTime = 24 * 60 * 60 * 1000; // 1 day in ms
const persistTime = 60 * 1000; // 1 min

const persistDataPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === "updateServiceDate") {
      let record = {
        dateTime: state.lastServiced,
        persistFor: state.lastServiced.getTime() + persistTime
      };
      try {
        window.localStorage.setItem("last_serviced", JSON.stringify(record));
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  });
  store.subscribeAction({
    before: (action, state) => {
      console.log("before", action, state);
    },
    after: (action, state) => {
      console.log("after", action, state);
    }
  });
};

export default persistDataPlugin;
