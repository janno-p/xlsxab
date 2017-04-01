<template>
    <div>
        <webview
            ref="webview"
            src="file:///home/janno/Desktop/BT%20email%20template.html"
            :style="{ height: previewHeight + 'px' }"
        ></webview>
        <el-row>
            <el-col :span="12">
                <h1 style="background-color: red">Hello, World</h1>
            </el-col>
            <el-col :span="12">
                {{ indicator }}
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import App from "./app.ts";
export default App;
</script>
