
/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @fileOverview The "prestationvars" plugin.
 *
 */

'use strict';

( function() {
	CKEDITOR.plugins.add( 'prestationvars', {
		requires: 'widget,dialog',
		lang: 'fr', // %REMOVE_LINE_CORE%
		icons: 'prestationvars', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%

		onLoad: function() {
			// Register styles for prestationvars widget frame.
			CKEDITOR.addCss( '.cke_prestationvars{background-color:#ff0}' );
		},

		init: function( editor ) {

			var lang = editor.lang.prestationvars;

			// Register dialog.
			CKEDITOR.dialog.add( 'prestationvars', this.path + 'dialogs/prestationvars.js' );

			// Put ur init code here.
			editor.widgets.add( 'prestationvars', {
				// Widget code.
				dialog: 'prestationvars',
				pathName: lang.pathName,
				// We need to have wrapping element, otherwise there are issues in
				// add dialog.
				template: '<span class="cke_prestationvars">[[]]</span>',

				downcast: function() {
					return new CKEDITOR.htmlParser.text( '{{' + this.data.name + '}}' );
				},

				init: function() {
					// Note that prestationvars markup characters are stripped for the name.
					this.setData( 'name', this.element.getText().slice( 2, -2 ) );
				},

				data: function() {
					this.element.setText( '{{' + this.data.name + '}}' );
				},

				getLabel: function() {
					return this.editor.lang.widget.label.replace( /%1/, this.data.name + ' ' + this.pathName );
				}
			} );

			editor.ui.addButton && editor.ui.addButton( 'CreatePrestationvar', {
				label: lang.toolbar,
				command: 'prestationvars',
				toolbar: 'insert,5',
				icon: 'prestationvars'
			} );
		},

		afterInit: function( editor ) {
			var prestationvarsReplaceRegex = /{{([^{}])+}}/g;

			editor.dataProcessor.dataFilter.addRules( {
				text: function( text, node ) {
					var dtd = node.parent && CKEDITOR.dtd[ node.parent.name ];

					// Skip the case when prestationvars is in elements like <title> or <textarea>
					// but upcast prestationvars in custom elements (no DTD).
					if ( dtd && !dtd.span )
						return;

					return text.replace( prestationvarsReplaceRegex, function( match ) {
						// Creating widget code.
						var widgetWrapper;
						var innerElement = new CKEDITOR.htmlParser.element( 'span', {
							'class': 'cke_prestationvars'
						} );

						// Adds prestationvars identifier as innertext.
						innerElement.add( new CKEDITOR.htmlParser.text( match ) );
						widgetWrapper = editor.widgets.wrapElement( innerElement, 'prestationvars' );

						// Return outerhtml of widget wrapper so it will be placed
						// as replacement.
						return widgetWrapper.getOuterHtml();
					} );
				}
			} );
		}
	} );

} )();
