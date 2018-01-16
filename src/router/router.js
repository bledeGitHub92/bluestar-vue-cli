import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: 'route-path', components: resolve => {
        require.ensure([], () => void resolve(require('require-path')), 'name')
    }
}];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;