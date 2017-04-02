<template>
    <el-row class="start-up">
        <el-col :span="24" :sm="{ offset: 6, span: 12 }">
            <el-card>
                <div slot="header">
                    <strong>Getting Started</strong>
                </div>
                <div>Please choose input files you'll be working on:</div>
                <el-upload
                    action=""
                    :multiple="false"
                    :on-change="setDataFile"
                    :on-remove="removeDataFile"
                    :file-list="!!dataFile ? [dataFile] : []">
                    <el-button :style="{ 'margin-top': '1em' }" :plain="true" type="success" v-if="!dataFile">Choose data file (.xlsx) &hellip;</el-button>
                </el-upload>
                <el-upload
                    action=""
                    :multiple="false"
                    :on-change="setTemplateFile"
                    :on-remove="removeTemplateFile"
                    :file-list="!!templateFile ? [templateFile] : []">
                    <el-button :style="{ 'margin-top': '1em' }" :plain="true" type="success" v-if="!templateFile">Choose template file (.html) &hellip;</el-button>
                </el-upload>
                <div :style="{ 'margin-top': '1em', 'text-align': 'right' }">
                    <el-button v-if="!!dataFile && !!templateFile" type="primary" @click="openWorkspace">Open Workspace</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style>
.start-up {
    margin-top: 5em;
}
</style>

<script>
module.exports = require("./start-up.ts");
</script>
