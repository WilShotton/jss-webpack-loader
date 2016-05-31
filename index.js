var jss = require('jss')
var jssCamelCase = require('jss-camel-case')
var jssNested = require('jss-nested')
var LoaderUtils = require('loader-utils')


function normaliseModule(module) {

    return module.hasOwnProperty('default')
        ? module.default
        : module
}

// Assumes functions with the same name are the same to avoid
// duplicated plugins with different versions. Consumer specified plugins
// will always override the defaults
function uniqFunction(arr) {

    var cache = {}

    return arr.filter(function(el) {

        var key = el.name || el.toString().replace(/\s/gm, '')

        return !Boolean(cache[key])
            ? (cache[key] = true)
            : false
    })
}

module.exports = function(source) {

    if (LoaderUtils.parseQuery(this.query).cacheable && this.cacheable) {
        this.cacheable()
    }

    var config = LoaderUtils.getLoaderConfig(this, 'jssWebpackLoader')

    var plugins = (config.plugins || [])
        .concat([jssCamelCase, jssNested])
        .map(normaliseModule)

    var sheet = jss.create()

    uniqFunction(plugins).forEach(function(plugin) {
        sheet.use(plugin())
    })

    var rules = this.exec(source, this.resource)

    return sheet
        .createStyleSheet(normaliseModule(rules), {named: false})
        .toString()
}
