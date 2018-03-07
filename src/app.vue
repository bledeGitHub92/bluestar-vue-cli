<template>
    <div id="app">
        <img src="./assets/logo.png" />
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
}

img {
    vertical-align: top;
}
</style>