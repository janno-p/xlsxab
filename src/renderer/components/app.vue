<template>
    <div class="container app">
        <component :is="componentName" />
    </div>
</template>

<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    .app {
        margin-top: 20px;
    }
</style>

<script>
module.exports = require("./app.ts");
</script>
