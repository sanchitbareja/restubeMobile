Ext.define('ResTube.view.ContactDetail', {
	extend: "Ext.Panel",
	alias: "widget.contactdetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl:"<div class='row'>"+
        		"<div class='small-5 columns'>"+
        			"<img src='{thumbnail_photo}' class='thumbnail_photo'>"+
        		"</div>"+
        		"<div class='small-7 columns'>"+
        			"<strong>{user.first_name} {user.last_name}</strong><br />"+
        			"<i>{job_title}</i>"+
        		"</div>"+
    		"</div>"+
    		"<div class='row'>"+
				"<div class='small-12 columns'>"+
					"<a href='tel:{phone_no}'><div class='actionButton'>Call</div></a>"+
					"<a href='mailto:{user.email}'><div class='actionButton'>Email</div></a>"+
					'<a href="skype:{skype_id}?call&video=true">'+
						'<div class="actionButton">Video Chat</div>'+
					'</a>'+
				"</div>"+
			"</div>",

		items: [{
			xtype: "toolbar",
			title: "Contact Information",
			docked: "top",
			items: {
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton4"
	        },
		}],

        listeners: [{
			delegate: "#backButton4",
			event: "tap",
			fn: "onBackButtonTap4",
		}],
	},

	onBackButtonTap4: function() {
		console.log("onBackButtonTapped4!");
		this.fireEvent("backToContactsCommand", this);
	},

});