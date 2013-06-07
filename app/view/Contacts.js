Ext.define("ResTube.view.Contacts", {
	extend: "Ext.dataview.List",
	alias: "widget.restubecontacts",

	config: {
		loadingText: "Loading Contacts...",
		emptyText: '<pre><div>No contacts :(</div></pre>',
		store: { xclass: 'ResTube.store.UserProfiles' },
        plugins: [
	        {
	            xclass: 'Ext.plugin.PullRefresh',
	            pullRefreshText: 'Pull down to refresh!',
	            refreshFn: function(plugin) {
	            	plugin.parent.parent.fireEvent("loadContactsDataCommand");
	            },
	        },{
	            xclass: 'Ext.plugin.ListPaging',
	            loadMoreText: "Fetching more contacts...",
	            autoPaging: true,
	            // loadMoreCmp is a private config method. not recommended to use and new solution needs to be found
	            loadMoreCmp: {
	            	xtype: 'component', 
	            	baseCls: Ext.baseCSSPrefix + 'list-paging', 
	            	scrollDock: 'bottom',
	            	id: 'getMoreContactsCmp',
	            	hidden: true,
	            	listeners: {
			        	painted: function(){
					    	this.parent.parent.parent.fireEvent("loadNextPageCommand");
					    	console.log("LOAD MORE DATA NOW!");
					    },
			        },	
	            },
	        }
	    ],

		itemTpl:'<div id="contactItem-{id}" class="row contactrow">'+
					'<div class="small-2 columns" id="contactItem-{id}">'+
						'<img src="{thumbnail_photo}" class="thumbnail_photo_list" id="contactItem-{id}">'+
					'</div>'+
					'<div class="small-10 columns" id="contactItem-{id}">'+
						'<strong id="contactItem-{id}">{user.first_name} {user.last_name}</strong>'+
						'<br/>'+
						"<span class='subtitle'>{job_title}</span>"+
						'<br/>'+
						'<p class="subsubtitle">'+
							'<span class="dateLeft">Specialist in {skills.length} machines</span>'+
						'</p>'+
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
                }],
		},{
            xtype: 'toolbar',
            docked: 'top',
            id: 'contactsearchtoolbar',
            ui: 'searchtoolbar',
            items: [
                { xtype: 'spacer' },
                {
                    xtype: 'searchfield',
                    placeHolder: ' search contacts',
                    id: 'contactsearchfield',
                }, {
	                xtype: "button",
	                text: "Go",
	                id: "contactSearchButton",
	            },
                { xtype: 'spacer' }
            ]
        }],

		listeners: [{
			delegate: "#logoutButton",
            event: "tap",
            fn: "onLogoutButtonTap",
        },{
			event: "show",
			fn: "onShow",
		},{
			delegate: "#contactSearchButton",
			event: "tap",
			fn: "onContactSearchButtonTap",
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

	onContactSearchButtonTap: function(){
		console.log("contactSearchButton pressed!");
		this.fireEvent("contactSearchCommand", Ext.getCmp('contactsearchfield')._value)
	},
});