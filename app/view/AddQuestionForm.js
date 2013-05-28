Ext.define("ResTube.view.AddQuestionForm", {
	extend: "Ext.form.Panel",
	requires: ["Ext.form.FieldSet"],
	alias: "widget.addquestionform",

	config: {
        masked: {
            xtype: 'loadmask',
            message: 'Posting',
            
        },

        items:[{
                xtype: "toolbar",
                docked: "top",
                title: "New Post",
                items: {
                    xtype: "button",
                    ui: "back",
                    text: "Back",
                    id: "backButton10",
                },
            }, {
                xtype: 'fieldset',
                margin: "10px",
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Question',
                        id: 'questionText',
                    },
                    {
                        xtype: 'textfield',
                        placeHolder: 'Details (Optional)',
                        id: 'detailsText',
                    },
                    //Fileup configuration for "Upload file" mode
                    {
                        itemId: 'fileBtn',
                        xtype: 'fileupload',
                        autoUpload: false,
                        url: 'http://127.0.0.1:8000/upload/file/'
                    }
                ]
            }, {
                xtype: 'button',
                margin: "10px",
                text: "Post",
                ui: "action",
                itemId: "postButton",
            }
        ],
		listeners: [{
				delegate: "#postButton",
				event: "tap",
				fn: "onPostButtonTap",
			},{
                event: "show",
                fn: "onShow",
            },{
                delegate: "#backButton10",
                event: "tap",
                fn: "onBackButtonTap",
            }
		],
	},

    //function to run on show
    onShow: function() {
        this.setMasked(false);
    },

	// handlers
	onPostButtonTap: function() {
		console.log("onPostButtonTap");
        this.setMasked(true);
		this.fireEvent("postButtonCommand", this, Ext.getCmp('questionText')._value, Ext.getCmp('detailsText')._value);
	},

    onBackButtonTap: function() {
        console.log("onBackButtonTapped!");
        //clear text in the form before going back
        Ext.getCmp('questionText').reset();
        Ext.getCmp('detailsText').reset();
        
        this.fireEvent("backToFeedCommand", this);
    },
});