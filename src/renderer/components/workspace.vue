<template>
    <div>
        <div>
            <el-button type="primary">
                <i class="fa fa-refresh"></i>
                Reload Files
            </el-button>
        </div>
        <webview
            ref="webview"
            src="file:///home/janno/Desktop/BT%20email%20template.html"
            :style="{ height: 'calc(100vh - 1.5em - 36px)', 'margin-top': '0.5em' }"
        ></webview>
    </div>
</template>

<script>
module.exports = require("./workspace.ts");
</script>
