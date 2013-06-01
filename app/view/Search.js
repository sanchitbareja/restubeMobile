Ext.define("ResTube.view.Search", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.restubesearch",

	config: {
        masked: {
            xtype: 'loadmask',
            message: 'Searching...',
            
        },

        items:[{
                xtype: "toolbar",
                docked: "top",
                title: "Search",
                items:[{
                    xtype: "button",
                    ui: "action",
                    text: "Logout",
                    id: "logoutButton",
                }]
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
                delegate: "#logoutButton",
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
		console.log("onSearchButtonTap");
        this.setMasked(true);
		this.fireEvent("searchButtonCommand", this, Ext.getCmp('searchText')._value);
	},
    
    onLogoutButtonTap: function(){
        console.log("Logout button pressed!");
        this.fireEvent('logoutCommand');
    },
});