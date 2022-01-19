
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
        group: 'Général',
        options: [
            {name: 'email_info_prestation(prestation)', text: 'Infos prestation'},
            {name: 'email_signature()', text: 'Signature'}
        ]
    },
    {
        group: 'Prestation',
        options: [
            { name: 'email_prestation_code(prestation)', text: 'Code' },
            { name: 'email_prestation_dateCreation(prestation)', text: 'Date' },
            { name: 'email_prestation_observation(prestation)', text: 'Observation' },
            { name: 'email_prestation_refsie(prestation)', text: 'Réf. SIE' },
            { name: 'email_prestation_client_nom(prestation)', text: 'Nom client' },
            { name: 'email_prestation_site_nom(prestation)', text: 'Nom site' },
            { name: 'email_prestation_site_adresse(prestation)', text: 'Adresse site' },
            { name: 'email_prestation_equipements(prestation)', text: 'Liste des équipements' }
        ]
    },
    {
        group: 'Produit',
        options: [
            { name: 'email_prestation_produit_designation(prestation)', text: 'Désignation' },
            { name: 'email_prestation_produit_famille_designation(prestation)', text: 'Famille' },
            { name: 'email_prestation_produit_sousfamille_designation(prestation)', text: 'Sous-Famille' }
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
