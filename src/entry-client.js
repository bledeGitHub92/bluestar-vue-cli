import Vue from 'vue';
import { createApp } from './app';

// 插件

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    // 在路由导航之前解析数据
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        const activated = matched.filter(
            (c, i) => diffed || (diffed = (prevMatched[i] !== c))
        );

        if (!activated.length) {
            return next();
        }

        // 显示加载指示器
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            // 停止加载指示器
            next();
        }).catch(next);

    });
    app.$mount('#app');
});