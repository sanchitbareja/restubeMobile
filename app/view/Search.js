Ext.define("ResTube.view.Search", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.restubesearch",

	config: {
        masked: {
            xtype: 'loadmask',
            message: 'Searching...',
            
        },

        scrollable: false,

        items:[{
                xtype: "toolbar",
                docked: "top",
                title: "Search",
                items:[{
                    xtype: "button",
                    ui: "action",
                    text: "Logout",
                    id: "logoutButtonS",
                }]
            }, {
                xtype: 'fieldset',
                margin: "10px",
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'product name, model number',
                        id: 'searchText',
                        autoCapitalize: false,

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
                delegate: "#logoutButtonS",
                event: "tap",
                fn: "onLogoutButtonTap",
            },{
				delegate: "#searchButton",
				event: "tap",
				fn: "onSearchButtonTap",
			},{
                event: "show",
                fn: "onShow",
            }
		],
	},

    //function to run on show
    onShow: function() {
        this.setMasked(false);
    },

	// handlers
	onSearchButtonTap: function() {
        this.setMasked(true);
		this.fireEvent("searchButtonCommand", this, Ext.getCmp('searchText').getValue());
	},
    
    onLogoutButtonTap: function(){
        this.fireEvent('logoutCommand');
    },
});