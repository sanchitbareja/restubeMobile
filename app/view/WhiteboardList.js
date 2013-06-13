Ext.define("ResTube.view.WhiteboardList", {
	extend: "Ext.dataview.List",
	alias: "widget.whiteboardlist",

	config: {
		loadingText: "Loading messages...",
		emptyText: '<pre><div>No messages :(</div></pre>',
		store: { xclass: 'ResTube.store.Messages' },
        plugins: [
	        {
	            xclass: 'Ext.plugin.PullRefresh',
	            pullRefreshText: 'Pull down to refresh!',
	            refreshFn: function(plugin) {
	            	plugin.parent.parent.fireEvent("loadMessagesDataCommand");
	            },
	        },{
	            xclass: 'Ext.plugin.ListPaging',
	            loadMoreText: "Fetching more messages...",
	            autoPaging: true,
	            // loadMoreCmp is a private config method. not recommended to use and new solution needs to be found
	            loadMoreCmp: {
	            	xtype: 'component', 
	            	baseCls: Ext.baseCSSPrefix + 'list-paging', 
	            	scrollDock: 'bottom',
	            	id: 'getMoreMessagesCmp',
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
						'<img src="{from_user.user_image}" class="thumbnail_photo_list">'+
					'</div>'+
					'<div class="small-2 columns">'+
						'<img src="{to_user.user_image}" class="thumbnail_photo_list">'+
					'</div>'+
					'<div class="small-6 columns">'+
						'<p>{text}</p>'+
					'</div>'+
					'<div class="small-2 columns">'+
						'<img src="{media_url}" class="thumbnail_photo_list">'+
					'</div>'+
				'</div>',

		items: [{
			xtype: "toolbar",
            docked: "top",
            title: "Messages",
            items:[{
                    xtype: "button",
                    ui: "action",
                    text: "Logout",
                    id: "logoutButtonM",
                }],
		},{
            xtype: 'toolbar',
            docked: 'top',
            id: 'messagesearchtoolbar',
            ui: 'searchtoolbar',
            items: [
                { xtype: 'spacer' },
                {
                    xtype: 'searchfield',
                    placeHolder: ' search messages',
                    id: 'messagesearchfield',
                }, {
	                xtype: "button",
	                text: "Go",
	                id: "messageSearchButton",
	            },
                { xtype: 'spacer' }
            ]
        }],

		listeners: [{
			delegate: "#logoutButtonM",
            event: "tap",
            fn: "onLogoutButtonTap",
        },{
			event: "show",
			fn: "onShow",
		},{
			event: "itemtap",
			fn: "listItemTap",
		},{
			delegate: "#messageSearchButton",
			event: "tap",
			fn: "onMessageSearchButtonTap",
		}],
	},

	listItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		this.fireEvent("messageInfoCommand", this, record.data.id);
	},
	onLogoutButtonTap: function(){
        console.log("Logout button pressed!");
        this.fireEvent('logoutCommand');
    },

	onShow: function(){
		console.log("Initialize contacts data!");
		this.fireEvent('loadMessagesDataCommand');
	},

	onMessageSearchButtonTap: function(){
		console.log("messageSearchButton pressed!");
		this.fireEvent("messageSearchCommand", Ext.getCmp('messagesearchfield').getValue())
	},
});