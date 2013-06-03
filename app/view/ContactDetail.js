Ext.define('ResTube.view.ContactDetail', {
	extend: "Ext.Panel",
	alias: "widget.contactdetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl:"<div class='row'>"+
        		"<div class='small-3 columns'>"+
        			"<img src='{thumbnail_photo}' class='thumbnail_photo'>"+
        		"</div>"+
        		"<div class='small-9 columns'>"+
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
			"</div>"+
			"<div class='row'>"+
				"<div class='small-12 columns'>"+
					'<span class="header" id="specialties">Specialties:</span>'+
					'<br/>'+
					"<tpl for='skills'>"+
						"<span class='label'><i>{name}</i></span>"+
					"</tpl>"+
				"</div>"+
			"</div>",

		items: [{
			xtype: "toolbar",
			title: "Contact Info",
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
		},{
            event: "show",
            fn: "onShow",
        }],
	},

	onBackButtonTap4: function() {
		console.log("onBackButtonTapped4!");
		this.fireEvent("backToContactsCommand", this);
	},

	onShow: function() {
		var full_name = this.getData().user.first_name+" "+this.getData().user.last_name;
		this.getDockedItems()[0].setTitle(full_name.slice(0,12)+"...");
	},

});