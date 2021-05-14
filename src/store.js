import Vue from "vue";
import Vuex from "vuex";
import { db, firebase } from "./boot/firestore";

Vue.use(Vuex);

const mutations = {
  SET_USER: "setUser",
  SET_WORKS: "setWorks",
};
const actions = {
  REGISTER: "register",
  INIT_USER: "initUser",
  LOGIN: "login",
  LOGOUT: "logout",

  INIT_WORK: "initWork",
  ADD_WORK: "addWork",
  DELETE_WORK: "deleteWork",
  UPDATE_WORK: "updateWork",
};

const store = new Vuex.Store({
  state: {
    user: null,
    toDoList: [],
  },
  mutations: {
    [mutations.SET_USER](state, value) {
      state.user = value;
    },
  },
  actions: {
    async [actions.INIT_USER]({ commit }) {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user)
            commit("setUser", {
              ...user.providerData[0],
              id: user.uid,
            });
          else commit("setUser", null);
          resolve(true);
        });
      });
    },
    async [actions.REGISTER](context, user) {
      const created = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      await created.user.updateProfile({ displayName: user.name });
      await firebase.auth().signOut();
    },
    async [actions.LOGIN]({ dispatch, commit }, user) {
      const signUser = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);

      commit(mutations.SET_USER, {
        ...signUser.user.providerData[0],
        id: signUser.user.uid,
      });
      dispatch("initWork");
      // db.collection("works")
      //   .doc(state.user.id)
      //   .collection("work")
      //   .orderBy("createdAt")
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       let document = doc.data();
      //       document.id = doc.id;
      //       state.toDoList.unshift(document);
      //     });
      //   });
    },
    async [actions.LOGOUT]({ state }) {
      await firebase.auth().signOut();
      state.toDoList = [];
    },

    async [actions.INIT_WORK]({ state }) {
      if (state.user) {
        db.collection("works")
          .doc(state.user.id)
          .collection("work")
          .orderBy("createdAt")
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              let document = change.doc.data();
              document.id = change.doc.id;
              if (change.type === "added") {
                state.toDoList.unshift(document);
              } else if (change.type === "modified") {
                const index = state.toDoList.findIndex(
                  (item) => item.id == document.id
                );
                Object.assign(state.toDoList[index], document);
              } else if (change.type === "removed") {
                const index = state.toDoList.findIndex(
                  (item) => item.id == document.id
                );
                state.toDoList.splice(index, 1);
              }
            });
          });
      }
    },
    async [actions.ADD_WORK]({ state }, data) {
      await db.collection("works").doc(state.user.id).collection("work").add({
        description: data.work,
        endTime: data.time,
        createdAt: Date.now(),
        done: false,
      });
    },
    async [actions.DELETE_WORK]({ state }, id) {
      await db
        .collection("works")
        .doc(state.user.id)
        .collection("work")
        .doc(id)
        .delete();
    },
    async [actions.UPDATE_WORK]({ state }, id) {
      await db
        .collection("works")
        .doc(state.user.id)
        .collection("work")
        .doc(id)
        .update({ done: true });
    },
  },
});

export default async function init() {
  await store.dispatch("initUser");
  await store.dispatch("initWork");
  return store;
}
