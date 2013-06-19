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
							'<li class="no_bullet"><embed src="{url}"></li>'+
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
					"<tpl if='values.multiple_data_link'>{multiple_data_link}</tpl>"+
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