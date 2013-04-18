Ext.define("ResTube.view.SearchResults", {
	extend: "Ext.dataview.List",
	alias: "widget.searchresults",

	config: {
		loadingText: "Loading Products...",
		emptyText: '<pre><div>No products found.</div></pre>',

		itemTpl:'<div id="productItem-{id}" class="row">'+
					'<div class="small-4 columns" id="productItem-{id}">'+
					'<tpl for="media">'+
						'<tpl if="id == 1">'+
							'<img src="{url}" class="thumbnail_photo_list" id="productItem-{[parent.id]}">'+
						'</tpl>'+
    				'</tpl></p>'+						
					'</div>'+
					'<div class="small-8 columns" id="productItem-{id}">'+
						'<strong id="productItem-{id}">{name}</strong>'+
						'<br />'+
						'<i id="productItem-{id}"><i>Model No.:</i>{model_no}</i>'+
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
		}],
	},

	onItemTap: function(nestedList, index, target, record, e, eOpts){
		console.log("An item was tapped!");
		var productID = Ext.get(index).id.slice(12);
		this.fireEvent("productInfoCommand", this, productID);
	},

	onBackButtonTap: function() {
		console.log("onBackButtonTapped!");
		var datastore = this.getStore();
		datastore.removeAll();
		this.fireEvent("backButtonCommand", this);
	},
});