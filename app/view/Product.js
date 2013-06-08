Ext.define('ResTube.view.Product',{
	extend: "Ext.Panel",
	alias: "widget.restubeproduct",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl:"<div class='row'>"+
        		"<div class='small-12 columns'>"+
        			'<strong class="header">{name}</strong>'+
	        		'<ul class="rslides">'+
		        		'<tpl for="media">'+
							'<li><embed src="{url}"></li>'+
	    				'</tpl>'+
					'</div>'+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'>"+
        		"<div class='small-12 columns'>"+
					// '<img src="{parts_link}" style="width:100%;">'+
					'<i>Model No: {model_no}</i><br />'+
					'<i>Serial No: {serial_no}</i><br />'+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'>"+
				"<div class='small-12 columns'>"+
					"<tpl if='values.iom_link'><a class='actionButton' href='{iom_link}' target='_blank'>IOM</a><br /></tpl>"+
					"<tpl if='values.service_bulletin_link'><a class='actionButton' href='{service_bulletin_link}' target='_blank'>Service Bulletin</a><br /></tpl>"+
					"<tpl if='values.electrical_link'><a class='actionButton' href='{electrical_link}' target='_blank'>Electrical Schematic</a><br /></tpl>"+
					"<tpl if='values.service_history_link'><a class='actionButton' href='{service_history_link}' target='_blank'>Service History</a><br /></tpl>"+
					"<tpl if='values.performance_data_link'><a class='actionButton' href='{performance_data_link}' target='_blank'>Performance Data</a><br /></tpl>"+
				"</div>"+
			"</div>",
		items: [{
			xtype: "toolbar",
			title: "Product Info",
			docked: "top",
			items: {
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton2"
	        },
		}],

        listeners: [{
			delegate: "#backButton2",
			event: "tap",
			fn: "onBackButtonTap2",
		}],
	},
	onBackButtonTap2: function() {
		console.log("onBackButtonTapped2!");
		this.fireEvent("backToResultsCommand", this);
	},
});