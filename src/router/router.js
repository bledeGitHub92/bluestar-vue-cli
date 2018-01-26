import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [{
            path: '/prerender',
            component: () => import('../components/PreRender.vue')
        }, {
            path: '/item',
            component: () => import('../components/item.vue'),
        }]
    });
}