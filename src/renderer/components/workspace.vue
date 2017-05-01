<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <ui-select
                        placeholder="Choose template"
                        :disabled="templates.length === 0"
                        :keys="{ label: 'basename', value: 'filepath' }"
                        :options="templates"
                        v-model="activeTemplate"
                    ><i class="fa fa-file-o" slot="icon"></i>
                    </ui-select>
                </div>
                <div class="col-md-4">
                    <ui-select
                        placeholder="No languages found"
                        :disabled="languages.length === 0"
                        :options="languages"
                        v-model="activeLanguage"
                    ><i class="fa fa-language" slot="icon"></i>
                    </ui-select>
                </div>
                <div class="col-md-4">
                    <ui-select
                        :label="null"
                        placeholder="No markets for language"
                        :disabled="markets.length === 0"
                        :options="markets"
                        v-model="activeMarket"
                    ><i class="fa fa-money" slot="icon"></i>
                    </ui-select>
                </div>
            </div>
        </div>
        <div class="panel-body" style="padding: 0">
            <webview
                ref="webview"
                style="height: calc(100vh - 112px)"
                :src="previewFile"
            ></webview>
        </div>
    </div>
</template>

<script>
module.exports = require("./workspace");
</script>
