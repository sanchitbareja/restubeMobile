Ext.define('ResTube.view.ContactDetail', {
	extend: "Ext.Panel",
	alias: "widget.contactdetail",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl: "<div><ul><li>Name: {user.username}</li><li>Phone No: {phone_no}</li><li>email: {user.email}</li></ul></div>",

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