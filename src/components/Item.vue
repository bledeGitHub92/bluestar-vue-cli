<!-- Item.vue -->
<template>
<div class="item">
  <button @click="sayItem">click me</button>
</div>
</template>
<script>
import titleMixin from '../mixins/title-mixin';

export default {
  name: 'Item',
  mixins: [titleMixin],
  title() {
    return 'item';
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch("fetchItem", route.params.id);
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return this.$store.state.items[this.$route.params.id];
    }
  },
  methods: {
    sayItem() {
      this.$medLoading.show();
    }
  }
};
</script>