Ext.define("ResTube.view.Feedback", {
	extend: "Ext.form.Panel",
	requires: "Ext.form.FieldSet",
	alias: "widget.restubefeedback",

	config: {
        masked: {
            xtype: 'loadmask',
            message: 'Sending feedback...',
            
        },

        items:[{
                xtype: "toolbar",
                docked: "top",
                title: "Feedback",
                items:[{
                    xtype: "button",
                    ui: "action",
                    text: "Logout",
                    id: "logoutButtonF",
                }],
            }, {
                xtype: 'fieldset',
                margin: "10px",
                items: [
                    {
                        xtype: 'textareafield',
                        placeHolder: 'There was an error.',
                        style: { 'height': '7em', 'text-wrap': 'normal' },
                        id: 'feedbackText',
                    }
                ]
            }, {
                xtype: 'button',
                margin: "10px",
                text: "Send",
                ui: "action",
                itemId: "feedbackButton",
            }
        ],
		listeners: [{
                delegate: "#logoutButtonF",
                event: "tap",
                fn: "onLogoutButtonTap",
            },{
				delegate: "#feedbackButton",
				event: "tap",
				fn: "onFeedbackButtonTap",
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
	onFeedbackButtonTap: function() {
		console.log("onFeedbackButtonTap");
        this.setMasked({
            xtype: 'loadmask',
            message: 'Sending feedback...',
            indicator: true,
        });
		this.fireEvent("feedbackButtonCommand", this, Ext.getCmp('feedbackText').getValue());
	},
    
    onLogoutButtonTap: function(){
        console.log("Logout button pressed!");
        this.fireEvent('logoutCommand');
    },
});