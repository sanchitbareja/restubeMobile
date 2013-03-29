Ext.define('ResTube.view.FeedDetail',{
	extend: "Ext.Panel",
	alias: "widget.feeddetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl: "<div><ul><li>Name: {name}</li><li>Details: {details}</li><li>Issue No: {issue_no}</li><li>Posted By: {posted_by.username}</li><li>Status: {status}</li><li>Location: {location.name}, {location.lat}, {location.lng}</li><li>Start Time: {start_time}</li></ul></div>",

		items: [{
			xtype: "toolbar",
			title: "Repair Information",
			docked: "top",
			items: {
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton3"
	        },
		}],

        listeners: [{
			delegate: "#backButton3",
			event: "tap",
			fn: "onBackButtonTap3",
		}],
	},

	onBackButtonTap3: function() {
		console.log("onBackButtonTapped3!");
		this.fireEvent("backToFeedCommand", this);
	},

});