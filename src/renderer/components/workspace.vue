<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <ui-button
                color="primary"
                @click="reloadData"
            ><i class="fa fa-refresh"></i>&nbsp;Reload Files
            </ui-button>
        </div>
        <div class="panel-body">
            <webview
                ref="webview"
                :src="template"
                :style="{ height: 'calc(100vh - 138px)', 'margin-top': '0.5em' }"
            ></webview>
        </div>
    </div>
</template>

<script>
module.exports = require("./workspace");
</script>
