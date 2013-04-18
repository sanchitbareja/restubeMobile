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
                xtype: "toolbar",
                docked: "top",
                title: "Login",
            }, {
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
    },

	// handlers
	onLoginButtonTap: function() {
		console.log("onLoginButtonTap");
        this.setMasked(true);
		this.fireEvent("loginButtonCommand", this, Ext.getCmp('username_field')._value, Ext.getCmp('password_field')._value);
	},
});