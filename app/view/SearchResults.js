Ext.define("ResTube.view.SearchResults", {
	extend: "Ext.dataview.List",
	alias: "widget.searchresults",

	config: {
		loadingText: "Loading Products...",
		emptyText: '<pre><div>No products found.</div></pre>',
		itemTpl: '<pre><div id="productItem-{id}">{name}</div><pre>',

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
		var productID = Ext.get(Ext.get(index).parent().query('div[id^=productItem]')[0]).id.slice(12);
		this.fireEvent("productInfoCommand", this, productID);
	},

	onBackButtonTap: function() {
		console.log("onBackButtonTapped!");
		var datastore = this.getStore();
		datastore.removeAll();
		this.fireEvent("backButtonCommand", this);
	},
});