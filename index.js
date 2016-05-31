var jss = require('jss')
var jssCamelCase = require('jss-camel-case')
var jssNested = require('jss-nested')
var LoaderUtils = require('loader-utils')


module.exports = function(source) {

  console.log('JSS Webpack loader')
  console.log('this.resource', this.resource)
  // console.log('this.query', this.query)

  var config = LoaderUtils.getLoaderConfig(this, 'jssLoader')

  console.log('config', config)

  var query = LoaderUtils.parseQuery(this.query)

  if (query.cacheable && this.cacheable) {
    this.cacheable()
  }

  var sheet = jss.create()
  sheet.use(jssCamelCase.default())
  sheet.use(jssNested.default())

  var rules = this.exec(source, this.resource)

  // console.log(rules.default)


  var out = sheet
      .createStyleSheet(rules.default, { named: false })
      .toString()

  console.log('out', out)

  return out
}
