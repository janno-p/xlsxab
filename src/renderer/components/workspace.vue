<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-2">
                    <ui-button
                        color="primary"
                        @click="model.loadData()"
                    ><i class="fa fa-refresh"></i>&nbsp;Reload Files
                    </ui-button>
                </div>
                <div class="col-md-3">
                    <ui-select
                        :label="null"
                        placeholder="Select template"
                        :disabled="templates.length === 0"
                        :options="templates"
                        v-model="activeTemplate"
                    ><i class="fa fa-language" slot="icon"></i>
                    </ui-select>
                </div>
                <div class="col-md-3">
                    <ui-select
                        :label="null"
                        placeholder="Select preview language"
                        :disabled="languages.length === 0"
                        :options="languages"
                        v-model="activeLanguage"
                    ><i class="fa fa-language" slot="icon"></i>
                    </ui-select>
                </div>
                <div class="col-md-3">
                    <ui-select
                        :label="null"
                        placeholder="Select market"
                        :disabled="markets.length === 0"
                        :options="markets"
                        v-model="activeMarket"
                    ><i class="fa fa-money" slot="icon"></i>
                    </ui-select>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <webview
                ref="webview"
                :src="activeTemplate"
                :style="{ height: 'calc(100vh - 138px)', 'margin-top': '0.5em' }"
            ></webview>
        </div>
    </div>
</template>

<script>
module.exports = require("./workspace");
</script>
