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
                itemId: 'addquestionfieldset',
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
                    {
                        xtype: 'textfield',
                        id: 'mediaURL',
                        hidden: true,
                    },
                    //Fileup configuration for "Upload file" mode
                    {
                        itemId: 'fileBtn',
                        xtype: 'fileupload',
                        autoUpload: false,
                        url: 'http://restube.herokuapp.com/upload/file/',
                        // loadAsDataUrl: true,
                        states: {
                            browse: {
                                text: 'Browse and upload'
                            },
                            ready: {
                                text: 'Upload!'
                            },

                            uploading: {
                                text: 'Uploading',
                                loading: true// Enable loading spinner on button
                            }
                        }
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
		this.fireEvent("postButtonCommand", this, Ext.getCmp('questionText')._value, Ext.getCmp('detailsText')._value, Ext.getCmp('mediaURL')._value);
	},

    onBackButtonTap: function() {
        console.log("onBackButtonTapped!");
        //clear text in the form before going back
        Ext.getCmp('questionText').reset();
        Ext.getCmp('detailsText').reset();
        Ext.getCmp('mediaURL').reset();
        Ext.getCmp('mediaURL').setHidden(true);
        this.getComponent('addquestionfieldset').getComponent('fileBtn').setHidden(false);
        
        this.fireEvent("backToFeedCommand", this);
    },
});