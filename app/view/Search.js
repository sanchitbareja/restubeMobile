Ext.define("ResTube.view.Search", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.restubesearch",

	config: {
        masked: {
            xtype: 'loadmask',
            message: 'Searching...',
            
        },

        scrollable: true,

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
                        placeHolder: 'model number',
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
                id: "searchButton",
            }, {

            }, {
                xtype: 'panel',
                margin: '0 10px 0 10px',
                html:   '<div class="actionButton"><a href="https://www.comfortsite.com/ebiz/application/TechSupport/HVACKCLogin.asp?Source=PI">HVAC Knowledge Center</a></div>'+
                        '<div class="actionButton"><a href="https://www.comfortsite.com/ebiz/application/productinfo/elibrary.asp">eLibrary</a></div>'+
                        '<div class="actionButton"><a href="https://www.comfortsite.com/ebiz/FQA/default.aspx">Field Quality Alert</a></div>'+
                        '<div class="actionButton"><a href="https://www.comfortsite.com/EBiz/Application/ProductInfo/PerformanceData/default.asp">Performance Data</a></div>'+
                        '<div class="actionButton"><a href="https://www.comfortsite.com/EBiz/webcats/default.aspx">WebCATS</a></div>'+
                        '<div class="actionButton"><a href="https://www.comfortsite.com/EBiz/home/Home.asp?StartPage=%2fEBiz%2fhome%2fHomeSplash.asp">Model Number Lookup</a></div>',
            },
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