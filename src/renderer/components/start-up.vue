<template>
    <div class="start-up row">
        <div class="col-md-offset-3 col-md-6 col-sm-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Getting Started</h3>
                </div>
                <div class="panel-body">
                    <p>Please choose input files you'll be working on:</p>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <ui-fileupload name="data" :raised="true" :multiple="false" @change="changeDataFile">
                            <i slot="icon" class="fa fa-file-excel-o"></i>
                            Choose data file (.xlsx)
                        </ui-fileupload>
                        <sheet-selector :file="dataFile" v-if="!!dataFile" />
                    </li>
                    <li class="list-group-item">
                        <ui-fileupload name="template" :raised="true" :multiple="true" @change="changeTemplateFiles">
                            <i slot="icon" class="fa fa-file-text-o"></i>
                            Choose template files (.html)
                        </ui-fileupload>
                        <ul v-if="templateFiles.length > 0">
                            <li v-for="file in templateFiles">{{ file }}</li>
                        </ul>
                    </li>
                </ul>
                <div class="panel-footer text-right">
                    <ui-button
                        color="green"
                        :disabled="!dataFile || templateFiles.length === 0"
                        @click="openWorkspace"
                    >Open Workspace</ui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.start-up {
    margin-top: 5em;
}
</style>

<script>
module.exports = require("./start-up.ts");
</script>
