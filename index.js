import camelcase from "camelcase";

const ns        = '@wordpress/';
const nsExclude = [ 'icons', 'interface' ];

const external = {
	'jquery'   : 'jQuery',
	'lodash-es': 'lodash',
	'lodash'   : 'lodash',
	'moment'   : 'moment',
	'react-dom': 'ReactDOM',
	'react'    : 'React',
};

const wordpressMatch = new RegExp( `^${ ns }(?!(${ nsExclude.join('|') })).*$` ); // /^@wordpress\/(?!(icons|interface)).*$/;

export default function() {
	return {
		name: 'wp-resolve',
		options: ( options ) => {
			if ( ! Array.isArray( options.external ) ) {
				options.external = [ options.external ].filter( ext => ext );
			}

			options.external = options.external.concat( Object.keys( external ) );
			options.external.push( wordpressMatch );

			options.output.forEach( ( output ) => {
				const configGlobals = output.globals;

				const resolveGlobals = ( id ) => {
					// options.globals is an object - defer to it
					if ( typeof configGlobals === 'object' && configGlobals.hasOwnProperty( id ) && configGlobals[ id ] ) {
						return configGlobals[ id ];
					}

					// options.globals is a function - defer to it
					if ( typeof configGlobals === 'function' ) {
						const configGlobalId = configGlobals( id );

						if ( configGlobalId && configGlobalId !== id ) {
							return configGlobalId;
						}
					}

					// see if it's a static wp external
					if ( external.hasOwnProperty( id ) && external[ id ] ) {
						return external[ id ];
					}

					if ( wordpressMatch.test( id ) ) {
						// convert @namespace/component-name to namespace.componentName
						return camelcase( id ).replace( new RegExp( `^${ns}` ), 'wp.' ).replace( /\//g, '.' );
					}
				}

				output.globals = resolveGlobals;
			} );

			return options;
		}
	}
}
