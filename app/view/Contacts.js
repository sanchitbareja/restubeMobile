Ext.define("ResTube.view.Contacts", {
	extend: "Ext.dataview.List",
	alias: "widget.restubecontacts",

	config: {
		loadingText: "Loading Contacts...",
		emptyText: '<pre><div>No contacts :(</div></pre>',

        plugins: [
	        {
	            xclass: 'Ext.plugin.PullRefresh',
	            pullRefreshText: 'Pull down to refresh!',
	            refreshFn: function(plugin) {
	            	plugin.parent.parent.fireEvent("loadContactsDataCommand");
	            },
	        }
	    ],

		itemTpl:'<div id="contactItem-{id}" class="row contactrow">'+
					'<div class="small-2 columns" id="contactItem-{id}">'+
						'<img src="{thumbnail_photo}" class="thumbnail_photo_list" id="contactItem-{id}">'+
					'</div>'+
					'<div class="small-10 columns" id="contactItem-{id}">'+
						'<strong id="contactItem-{id}">{user.first_name} {user.last_name}</strong>'+
						'<br />'+
						"<tpl for='skills'>"+
							"<span class='label'><i>{name}</i></span>"+
						"</tpl>"+
					'</div>'+
				'</div>',

		items: [{
			xtype: "toolbar",
            docked: "top",
            title: "Contacts",
            items:[{
                    xtype: "button",
                    ui: "action",
                    text: "Logout",
                    id: "logoutButton",
                }]
		}],

		listeners: [{
			delegate: "#logoutButton",
            event: "tap",
            fn: "onLogoutButtonTap",
        },{
			event: "show",
			fn: "onShow",
		}],
	},

	onItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		console.log(Ext.get(index));
		var contactID = Ext.get(index).id.slice(12);
		this.fireEvent("contactInfoCommand", this, contactID);
	},
	onLogoutButtonTap: function(){
        console.log("Logout button pressed!");
        this.fireEvent('logoutCommand');
    },

	onShow: function(){
		console.log("Initialize contacts data!");
		this.fireEvent('loadContactsDataCommand');
	},
});