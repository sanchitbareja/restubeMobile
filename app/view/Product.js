Ext.define('ResTube.view.Product',{
	extend: "Ext.Panel",
	alias: "widget.restubeproduct",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl: "<div><ul><li>Name: {name}</li><li>Description: {description}</li><li>Model No: {model_no}</li><li>Serial No: {serial_no}</li></ul></div>",
		items: [{
			xtype: "toolbar",
			title: "Product Information",
			docked: "top",
			items: {
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton2"
	        },
		},{
            xtype: 'button',
            margin: "10px",
            text: "Service History",
            ui: "action",
            itemId: "serviceHistory",
        },{
            xtype: 'button',
            margin: "10px",
            text: "Bill of Materials",
            ui: "action",
            itemId: "billOfMaterials",
        },{
            xtype: 'button',
            margin: "10px",
            text: "Kestrel View",
            ui: "action",
            itemId: "kestrelView",
        }],

        listeners: [{
			delegate: "#backButton2",
			event: "tap",
			fn: "onBackButtonTap2",
		},{
			delegate: "#serviceHistory",
			event: "tap",
			fn: "onServiceHistoryTap",
		},{
			delegate: "#billOfMaterials",
			event: "tap",
			fn: "onBillOfMaterialsTap",
		},{
			delegate: "#kestrelView",
			event: "tap",
			fn: "onKestrelViewTap",
		}],
	},

	onBackButtonTap2: function() {
		console.log("onBackButtonTapped2!");
		this.fireEvent("backToResultsCommand", this);
	},

	onServiceHistoryTap: function() {
		console.log("onServiceHistoryTap");
	},

	onBillOfMaterialsTap: function() {
		console.log("onBillOfMaterialsTap");
	},

	onKestrelViewTap: function() {
		console.log("onKestrelViewTap");
	},
});