Ext.define("ResTube.view.Search", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.restubesearch",

	config: {
        items:[{
                xtype: "toolbar",
                docked: "top",
                title: "Search",
            }, {
                xtype: 'fieldset',
                margin: "10px",
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Search by Product name',
                        id: 'searchText',
                    }
                ]
            }, {
                xtype: 'button',
                margin: "10px",
                text: "Search",
                ui: "action",
                itemId: "searchButton",
            }
        ],
		listeners: [{
				delegate: "#searchButton",
				event: "tap",
				fn: "onSearchButtonTap",
			}
		],
	},

	// handlers
	onSearchButtonTap: function() {
		console.log("onSearchButtonTap");
		this.fireEvent("searchButtonCommand", this, Ext.getCmp('searchText')._value);
	},
});