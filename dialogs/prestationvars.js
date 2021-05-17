
/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @fileOverview Definition for prestationvars plugin dialog.
 *
 */

'use strict';


const vars = [
    {
        group: 'Prestation',
        options: [
            { name: 'prestation.code', text: 'Code' },
            { name: 'prestation.dateCreation', text: 'Date' },
            { name: 'prestation.observation', text: 'Observation' },
            { name: 'prestation.refsie', text: 'Réf. SIE' }
        ]
    },
    {
        group: 'Client',
        options: [
            { name: 'prestation.client.nom', text: 'Nom' },
            { name: 'prestation.client.adresse.adresse1', text: 'Adresse 1' },
            { name: 'prestation.client.adresse.adresse2', text: 'Adresse 2' },
            { name: 'prestation.client.adresse.adresse3', text: 'Adresse 3' },
            { name: 'prestation.client.adresse.cp', text: 'Code Postal' },
            { name: 'prestation.client.adresse.ville', text: 'Ville' }
        ]
    },
    {
        group: 'Site',
        options: [
            { name: 'prestation.site.nom', text: 'Nom' },
            { name: 'prestation.site.adresse.adresse1', text: 'Adresse 1' },
            { name: 'prestation.site.adresse.adresse2', text: 'Adresse 2' },
            { name: 'prestation.site.adresse.adresse3', text: 'Adresse 3' },
            { name: 'prestation.site.adresse.cp', text: 'Code Postal' },
            { name: 'prestation.site.adresse.ville', text: 'Ville' }
        ]
    },
    {
        group: 'Produit',
        options: [
            { name: 'prestation.produit.designation', text: 'Désignation' },
            { name: 'prestation.produit.famille.designation', text: 'Famille' },
            { name: 'prestation.produit.sousFamille.designation', text: 'Sous-Famille' }
        ]
    }
];


CKEDITOR.dialog.add( 'prestationvars', function( editor ) {
    var lang = editor.lang.prestationvars;
    var generalLabel = editor.lang.common.generalTab;
    var validNameRegex = /^[^\[\]<>]+$/;
    var select = '<select>';
    vars.forEach(item => {
        select += `<optgroup label="${item.group}">`;
        item.options.forEach(option => {
            select += `<option value="${option.name}">${option.text}</option>`;
        });
        select += '</optgroup>';
    });
    select += '</select>';

    return {
        title: lang.title,
        minWidth: 300,
        minHeight: 80,
        contents: [
            {
                id: 'info',
                label: generalLabel,
                title: generalLabel,
                elements: [
                    // Dialog window UI elements.
                    {
                        id: 'name',
                        type: 'html',
                        html: select,
                        style: 'width: 100%;',
                        label: lang.name,
                        'default': '',
                        required: true,
                        validate: CKEDITOR.dialog.validate.regex( validNameRegex, lang.invalidName ),
                        setup: function( widget ) {
                            let name = widget.data.name;
                            if (name) {
                                name = name.trim();
                            }
                            document.getElementById(this.domId).value = name;

                        },
                        commit: function( widget ) {
                            let input = this.getInputElement().$;
                            let name = this.getValue();
                            if (name) {
                                name = name.trim();
                            }
                            let text =  input.options[ input.selectedIndex ].text;
                            if (text) {
                                text = text.trim();
                            }

                            widget.setData( 'name', name );
                            widget.setData( 'text', text );
                        }
                    }
                ]
            }
        ]
    };
} );
