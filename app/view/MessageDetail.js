Ext.define('ResTube.view.MessageDetail', {
	extend: "Ext.Panel",
	alias: "widget.messagedetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl:"<div class='row'>"+
        		"<div class='small-3 columns'>"+
        			"<img src='{from_user.user_image}' class='thumbnail_photo'>"+
        		"</div>"+
        		"<div class='small-3 columns'>"+
        			"<img src='{to_user.user_image}' class='thumbnail_photo'>"+
        		"</div>"+
    		"</div>"+
    		"<div class='row'>"+
				"<div class='small-12 columns'>"+
        			"<img src='{media_url}'>"+
				"</div>"+
			"</div>"+
			"<div class='row'>"+
				"<div class='small-12 columns'>"+
					'<p>{text}</p>'+
				"</div>"+
			"</div>",

		items: [{
			xtype: "toolbar",
			title: "Message",
			docked: "top",
			items: [{
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton10"
	        },
	        { xtype: "spacer" },
	        {
	        	xtype: "button",
	        	ui: "action",
	        	text: "Reply",
	        	id: "replyMessage",
	        }],
	    }],


        listeners: [{
			delegate: "#backButton10",
			event: "tap",
			fn: "onBackButtonTap10",
		},{
            event: "show",
            fn: "onShow",
        },{
			delegate: "#replyMessage",
			event: "tap",
			fn: "onReplyMessage",
		},],
	},

	onBackButtonTap10: function() {
		console.log("onBackButtonTapped10!");
		this.fireEvent("backToMessagesCommand", this);
	},

	onShow: function() {
	},

	onReplyMessage: function() {
		var to_user_data = this.getData();
		this.fireEvent("launchWhiteboard", to_user_data, to_user_data['media_url']);
	}

});