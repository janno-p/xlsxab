<template>
    <div class="sheet-selector">
        <template v-if="loading">
            <ui-progress-circular color="multi-color" />
            Loading data file &hellip;
        </template>
        <template v-else>
            <ui-select
                label="Translations Worksheet"
                placeholder="Select translations worksheet"
                :options="worksheets"
                v-model="translationsSheet"
            ></ui-select>
            <ui-select
                label="City Pairs Worksheet"
                placeholder="Select city pairs worksheet"
                :options="worksheets"
                v-model="cityPairsSheet"
            ></ui-select>
        </template>
    </div>
</template>

<style>
    .sheet-selector {
        margin-top: 0.5em;
    }
</style>

<script>
module.exports = require("./sheet-selector");
</script>
