Ext.define("ResTube.view.Contacts", {
	extend: "Ext.dataview.List",
	alias: "widget.restubecontacts",

	config: {

		loadingText: "Loading Contacts...",
		emptyText: '<pre><div>No contacts :(</div></pre>',
		itemTpl: '<pre><div id="contactItem-{id}">{user.username}</div><pre>',

		items: [{
			xtype: "toolbar",
            docked: "top",
            title: "Contacts",
		}],

		listeners: [{
			event: "show",
			fn: "onShow",
		}],
	},

	onItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		var contactID = Ext.get(Ext.get(index).parent().query('div[id^=contactItem]')[0]).id.slice(12);
		this.fireEvent("contactInfoCommand", this, contactID);
	},

	onShow: function(){
		console.log("Initialize contacts data!");
		this.fireEvent('loadContactsDataCommand');
	},
});