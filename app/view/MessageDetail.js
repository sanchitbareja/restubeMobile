Ext.define('ResTube.view.MessageDetail', {
	extend: "Ext.Panel",
	alias: "widget.messagedetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl:['<div class="message_card">'+
	        	"<div class='row'>"+
	        		"<div class='small-8 columns'>"+
	        			"<b>From:</b> {from_user.first_name} {from_user.last_name}"+
	        			'<br/>'+
	        			'<b>To:</b> {to_user.first_name} {to_user.last_name}'+
	        			'<br/>'+
		        		"<i>"+
		        			'{[this.convertDate(values.posted_at)]}'+
	        			'</i>'+
	        		"</div>"+
	        		"<div class='small-4 columns'>"+
	        			"<img src='{from_user.user_image}' class='thumbnail_photo right'>"+
	        		"</div>"+
	    		"</div>"+
				"<div class='row'>"+
					"<div class='small-12 columns'>"+
						'<p>{text}</p>'+
					"</div>"+
				"</div>"+
				"<hr class='message_divider'/>"+
				"<div class='row'>"+
					"<div class='small-12 columns'>"+
	        			"<img src='{media_url}' class='message_pic'>"+
					"</div>"+
				"</div>"+
			"</div>",
			{
				convertDate: function(json_date){
					js_now = new Date();
					js_date = new Date(json_date);
					js_diff = js_now.getTime() - js_date.getTime();
					js_now_time = js_now.getTime();
					js_date_time = js_date.getTime();
					if(js_now_time - js_date_time < 60000){ // 0 - 60 secs
						return new String(Math.floor((js_now_time - js_date_time)/1000)) + " secs ago";
					} else if(js_now_time - js_date_time < 3600000) { // 1- 59 minutes
						minutes_ago = Math.floor((js_now_time - js_date_time)/60000);
						if(minutes_ago == 1){
							return new String(minutes_ago) + " min ago";
						} else {
							return new String(minutes_ago) + " mins ago";
						}
					} else if(js_now_time - js_date_time < 86400000) { // 1-23 hours
						hours_ago = Math.floor((js_now_time - js_date_time)/3600000);
						if(hours_ago == 1){
							return new String(hours_ago) + " hour ago";
						} else {
							return new String(hours_ago) + " hours ago";
						}
					} else if(js_now_time - js_date_time < 518400000) { // 1-6 days
						days_ago = Math.floor((js_now_time - js_date_time)/86400000);
						if(days_ago == 1){
							return new String(days_ago) + " day ago";
						} else {
							return new String(days_ago) + " days ago";
						}
					} else if(js_now_time - js_date_time < 2073600000) { // 1-4 weeks
						weeks_ago = Math.floor((js_now_time - js_date_time)/518400000);
						if(weeks_ago == 1){
							return new String(weeks_ago) + " week ago";
						} else {
							return new String(weeks_ago) + " weeks ago";
						}
					} else {
						return js_date.toDateString();
					}
				},
			}],

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
	        	hidden: false,
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