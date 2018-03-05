<template>
    <div id="app" class="blue-star">
        <h1 style="padding:10%;font-weight:bold;font-size:26px;">Hello HOT-RELOAD</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$medLoading.show();
    }
}
</script>

<style lang="less">
</style>