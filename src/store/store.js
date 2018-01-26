import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

function fetchItem(id) {
    return new Promise(resolve => void resolve(id));
}

export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        getters: {},
        mutations: {
            setItem(state, { id, item }) {
                Vue.set(state.items, id, item);
            }
        },
        actions: {
            fetchItem({ commit }, id) {
                return fetchItem(id)
                    .then(item => void commit('setItem', { id, item }))
                    .catch(err => void console.log(err));
            }
        },
        plugins: [],
        modules: {},
        strict: process.env.NODE_ENV !== 'production', // 如果 state 不是通过 mutation 修改的将报错
    });
}