Ext.define("ResTube.view.Feed", {
	extend: "Ext.dataview.List",
	alias: "widget.restubefeed",

	config: {

		loadingText: "Loading Feed...",
		emptyText: '<pre><div>No feed :(</div></pre>',
		itemTpl: '<pre><div id="repairItem-{id}">{name}</div><pre>',
		masked: {
        	xtype: "loadmask",
        	message: "Loading Feed...",
        },

        plugins: [
	        {
	            xclass: 'Ext.plugin.PullRefresh',
	            pullRefreshText: 'Pull down to refresh!',
	            refreshFn: function(plugin) {
	            	plugin.parent.parent.fireEvent("loadDataCommand");
	            },
	        }
	    ],

		items: [{
			xtype: "toolbar",
            docked: "top",
            title: "TechConnect",
            items: {
	            xtype: "button",
	            ui: "refresh",
	            text: "Refresh",
	            id: "refreshFeedButton"
	        },
		}],

		listeners: [{
			delegate: "#refreshFeedButton",
			event: "tap",
			fn: "onRefreshButtonTap",
		},{
			event: "show",
			fn: "onShow",
		}],
	},

	onItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		var repairID = Ext.get(Ext.get(index).parent().query('div[id^=repairItem]')[0]).id.slice(11);
		this.fireEvent("repairInfoCommand", this, repairID);
	},

	onShow: function(){
		console.log("Initialize feed data!");
		this.fireEvent('loadDataCommand');
	},

	onRefreshButtonTap: function(){
		console.log("Refresh feed data!");
		this.fireEvent('loadDataCommand');
	}
});