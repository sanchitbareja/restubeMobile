Ext.define("ResTube.view.WhiteboardList", {
	extend: "Ext.dataview.List",
	alias: "widget.whiteboardlist",

	config: {
		loadingText: "Loading messages...",
		emptyText: '<div>You have not initiated any conversations yet!<br/>Go to the contacts page and select a</br>contact to begin a conversation.</div>',
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
	            loadMoreText: "",
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
					'<div class="small-12 columns">'+
						'<b>{from_user.first_name}</b> &#8680; <b>{to_user.first_name}</b> &nbsp;'+
						'<tpl if="media_url.length">'+
							'<img src="resources/icons/photo3.png" width="16px"/>'+
						'</tpl>'+
						'<br/>'+
						'<div class="message">{text}</div>'+
					'</div>'+
					// '<div class="small-2 columns">'+
					// 	'<img src="{media_url}" class="thumbnail_photo_list">'+
					// '</div>'+
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
                }, {
                	xtype: "spacer",
                }, {
                	xtype: "button",
                	ui: "action",
                	text: "Message",
                	id: "messageButton",
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
        }, {
        	delegate: "#messageButton",
        	event: "tap",
        	fn: "onMessageButtonTap",
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

    onMessageButtonTap: function(){
    	console.log("On message button tap");
    	this.fireEvent('messageButtonCommand', this);
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