<template>
    <div id="app" class="blue-star">
        <h1 style="padding:10%;font-weight:bold;font-size:26px;">Hello HOT-RELOAD</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
* {
    box-sizing: border-box;
}

body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; }
body { background:#fff; color:#555; font-size:14px; font-family: Arial, '宋体', sans-serif; }
td,th,caption { font-size:14px; }
h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; }
address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;}
a { color:#555; text-decoration:none; }
a:hover { text-decoration:underline; }
img { border: none; vertical-align: top; }
ol,ul,li { list-style:none; }
table { border-collapse:collapse; }

.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
</style>