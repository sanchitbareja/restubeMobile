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
					'<a href="javascript:;" id="startMessage"><div class="actionButton">ResTube Message</div></a>'+
					'<tpl if="values.skype_id && !ios">'+
	       				'<a id="negVideoChat"><div class="actionButton">Video Call</div></a>'+
	       			"</tpl>"+
	       			'<tpl if="values.skype_id && ios">'+
	       				'<a href="skype:{skype_id}?call&video=true" id="startSkype"><div class="actionButton">Video Call</div></a>'+
	       			"</tpl>"+
					'<tpl if="values.phone_no">'+
	       				"<a href='tel:{phone_no}' id='startCall'><div class='actionButton'>Phone Call</div></a>"+
	       			"</tpl>"+
					'<tpl if="values.user.email">'+
	       				"<a href='mailto:{user.email}' id='startEmail'><div class='actionButton'>Email</div></a>"+
	       			"</tpl>"+
				"</div>"+
			"</div>"+
			"<div class='row'>"+
				"<div class='small-12 columns'>"+
					'<tpl if="skills.length">'+
						'<span class="header" id="specialties">Areas of Expertise:</span>'+
						'<br/>'+
						"<tpl for='skills'>"+
							"<span class='label left'><i>{name}</i></span>"+
						"</tpl>"+
					'</tpl>'+
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
        	element: "element",
        	delegate: "a#negVideoChat",
        	event: "tap",
        	fn: "onNegVideoButtonTap",
        },{
			delegate: "#backButton4",
			event: "tap",
			fn: "onBackButtonTap4",
		},{
            event: "show",
            fn: "onShow",
        },{
			element: "element",
			delegate: "a#startMessage",
			event: "tap",
			fn: "onStartMessageTap",
		},{
			element: "element",
			delegate: "a#startCall",
			event: "tap",
			fn: "onStartCallTap",
		},{
			element: "element",
			delegate: "a#startEmail",
			event: "tap",
			fn: "onStartEmailTap",
		},{
			element: "element",
			delegate: "a#startSkype",
			event: "tap",
			fn: "onStartSkypeTap",
		}],
	},

	onNegVideoButtonTap: function() {
		console.log("Unavailable video chat button tapped!");
		this.fireEvent("negVideoButtonCommand", this);
		var to_user_data = this.getData();
		this.fireEvent("addStatistic", to_user_data, 'skype_fail');
	},

	onBackButtonTap4: function() {
		console.log("onBackButtonTapped4!");
		this.fireEvent("backToContactsCommand", this);
	},

	onShow: function() {
		this.fireEvent("osCheck",this);
		var full_name = this.getData().user.first_name+" "+this.getData().user.last_name;
		this.getDockedItems()[0].setTitle(full_name.slice(0,12)+"...");
	},

	onStartMessageTap: function() {
		var to_user_data = this.getData();
		this.fireEvent("launchWhiteboard", to_user_data, '');
		this.fireEvent("addStatistic", to_user_data, 'message');
	},

	onStartCallTap: function() {
		var to_user_data = this.getData();
		this.fireEvent("addStatistic", to_user_data, 'call');
	}, 

	onStartEmailTap: function() {
		var to_user_data = this.getData();
		this.fireEvent("addStatistic", to_user_data, 'email');
	},

	onStartSkypeTap: function() {
		var to_user_data = this.getData();
		this.fireEvent("addStatistic", to_user_data, 'skype');
	},

});