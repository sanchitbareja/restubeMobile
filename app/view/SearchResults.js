Ext.define("ResTube.view.SearchResults", {
	extend: "Ext.dataview.List",
	alias: "widget.searchresults",

	config: {
		loadingText: "Loading Products...",
		emptyText: '<pre><div>No products found.</div></pre>',

		store: { xclass: 'ResTube.store.Products' },

		itemTpl:'<div class="row contactrow">'+
					'<div class="small-3 columns">'+
					'<tpl for="media">'+
						'<tpl if="[xindex] == \'1\'">'+
							'<img src="{url}" class="thumbnail_photo_list">'+
						'</tpl>'+
    				'</tpl>'+						
					'</div>'+
					'<div class="small-9 columns">'+
						'<strong>{name}</strong>'+
						'<br />'+
						'<i class="modelnum">MN: {model_no}</i>'+
					'</div>'+
				'</div>',

		items: [{
			xtype: "toolbar",
            docked: "top",
            title: "Search Results",
            items: {
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton"
	        },
		}],
		
		listeners: [{
			delegate: "#backButton",
			event: "tap",
			fn: "onBackButtonTap",
		},{
			event: "itemtap",
			fn: "listItemTap",
		}],
	},

	listItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		this.fireEvent("productInfoCommand", this, record.data.id);
	},

	onBackButtonTap: function() {
		console.log("onBackButtonTapped!");
		var datastore = this.getStore();
		datastore.removeAll();
		this.fireEvent("backButtonCommand", this);
	},
});