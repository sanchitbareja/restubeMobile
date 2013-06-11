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

		itemTpl:'<div class="row contactrow">'+
					'<div class="small-2 columns">'+
						'<img src="{thumbnail_photo}" class="thumbnail_photo_list">'+
					'</div>'+
					'<div class="small-10 columns">'+
						'<strong>{user.first_name} {user.last_name}</strong>'+
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
                    id: "logoutButtonC",
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
			delegate: "#logoutButtonC",
            event: "tap",
            fn: "onLogoutButtonTap",
        },{
			event: "show",
			fn: "onShow",
		},{
			event: "itemtap",
			fn: "listItemTap",
		},{
			delegate: "#contactSearchButton",
			event: "tap",
			fn: "onContactSearchButtonTap",
		}],
	},

	listItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		this.fireEvent("contactInfoCommand", this, record.data.id);
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
		this.fireEvent("contactSearchCommand", Ext.getCmp('contactsearchfield').getValue())
	},
});