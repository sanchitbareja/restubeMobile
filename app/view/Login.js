Ext.define("ResTube.view.Login", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.logincontainer",

	config: {

        masked: {
            xtype: 'loadmask',
            message: 'Logging In...',
            
        },
        items:[{
                xtype: "panel",
                styleHtmlContent: true,
                html: "<h1 style='text-align:center;'><img src='resources/images/Trane-ResolutionTube.png' style='height:120px;'/></h1>",
            },
            {
                xtype: 'fieldset',
                margin: "10px",
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        id: 'username_field',
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        id: 'password_field',
                    }
                ]
            }, {
                xtype: 'button',
                margin: "10px",
                text: "Login",
                ui: "action",
                itemId: "loginButton",
                id: 'login_button'
            }
        ],
		listeners: [{
				delegate: "#loginButton",
				event: "tap",
				fn: "onLoginButtonTap",
			}, {
                event: "show",
                fn: "onShow",
            }
		],
	},

    // hide mask onShow
    onShow: function() {
        this.setMasked(false);
        this.fireEvent("onLoginShow", this);
    },

	// handlers
	onLoginButtonTap: function() {
		console.log("onLoginButtonTap");
        this.setMasked({
            xtype: 'loadmask',
            message: 'Logging In...',
            indicator: true,
        });
		this.fireEvent("loginButtonCommand", this, Ext.getCmp('username_field')._value, Ext.getCmp('password_field')._value);
	},
});