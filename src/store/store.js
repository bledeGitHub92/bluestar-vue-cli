import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // 如果 state 不是通过 mutation 修改的将报错
    modules: {},
    plugins: [],
    state: {},
    getters: {},
    mutations: {},
    actions: {},
});

export default store;