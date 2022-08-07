# WP Resolve

🍣 A rollup plugin which automatically converts dependencies bundled with WordPress to external dependencies. This is inspired by the WordPress [dependency-extraction-webpack-plugin](https://github.com/WordPress/gutenberg/tree/trunk/packages/dependency-extraction-webpack-plugin) from wp-scripts, but for those of us who prefer rollup.

**Note:**

This plugin does not support saving external dependencies to a php file for block registration. It may be considered in the future.

## Install

```js
npm install rollup-plugin-wp-resolve --save-dev
```

## rollup.config.js usage

```js
import wpResolve from 'rollup-plugin-wp-resolve';

export default {
	input: 'src/index.js',
	output: {
		dir: 'output',
		format: 'iife'
	},
	plugins: [
		wpResolve(),
	]
};
```

## Bundle usage

```
import { ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
```

will resolve to:

* wp.components.ToggleControl
* wp.data.useSelect
* wp.blockEditor.useBlockProps
* wp.serverSideRender

## 3rd Party Bundled Dependencies

This will also convert the following wordpress bundled dependencies automatically:

```js
import jQuery from 'jquery';
import lodash from 'lodash';
import lodash-es from 'lodash-es';
import moment from 'moment';
import ReactDOM from 'react-dom';
import React from 'react';
```

## Change log

### 1.0.9

* Remove commented out code
### 1.0.8

* Fix a bug where some wp modules would resolve incorrectly because of the camelcase algorithm (e.g. `import { __ } from @wordpress/i18n` would be mapped to `wp.i18N` and not `wp.i18n` )
* Remove camelcase as a dependency since it was no longer used

### 1.0.0

* Initial Release
