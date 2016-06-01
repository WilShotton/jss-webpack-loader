# JSS Webpack loader

A Webpack loader to convert JSS to CSS

### Webpack config

An example using babel-loader to transpile ES6, postcss-loader for vendor prefixes and css-loader for modular CSS. ExtractTextPLugin to create a discreet CSSS file

```JavaScript
module: {
	loaders: [
		{
			test: /\.js$|\.jss$/,
			loader: 'babel-loader',
			query: {
				cacheDirectory: true,
				presets: ['es2015', 'react'],
				plugins: ['transform-class-properties']
			}
		}, {
			test: /\.jss$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!jss-webpack-loader')
		}
	]
}
```

Add JSS plugins. JSS Extend and JSS Camelcase are included by default but can be overridden if necessary.

```JavaScript
jssWebpackLoader: {
	plugins: [
		require('jss-extend'),
		require('jss-nested'),
		require('jss-camel-case'),
		require('jss-px')
	]
}
```
 
### Creating JSS
 
```JavaScript
import _ from 'lodash'
import Colors from './Colors.jss'
import Typography from './Typography.jss'

export default {

	'.app': _.assign({}, Typography, {
		padding: '6px 20px 30px'
	}),
	
	'.header': {
		color: Colors.green,
		'&:hover': {
			color: Colors.blue
		}
	}
}
```

*Note:* Object keys must follow CSS selector syntax rules

### Consuming JSS
```JavaScript
import React from 'react'
import AppStyles from './App.jss'

export default React.createClass({

	render() {
		return (
			<div className={AppStyles.app}>
				<h1 className={AppStyles.header}>Hello World</h1>
			</div>
		)
	}
}
```
