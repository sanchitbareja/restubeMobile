Ext.define('ResTube.view.Product',{
	extend: "Ext.Panel",
	alias: "widget.restubeproduct",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl:"<div class='row'>"+
        		"<div class='small-12 columns'>"+
        			'<tpl if="name!=model_no">'+
        				'<strong class="header">{name}</strong>'+
        			'</tpl>'+
        			'<tpl if="media.length">'+
		        		'<ul class="rslides">'+
			        		'<tpl for="media">'+
								'<li class="no_bullet"><embed src="{url}"></li>'+
		    				'</tpl>'+
	    				'</ul>'+
    				'</tpl>'+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'>"+
        		"<div class='small-12 columns'>"+
					// '<img src="{parts_link}" style="width:100%;">'+
					'<i>Model No: {model_no}</i><br />'+
					'<tpl if="serial_no.length"><i>Serial No: {serial_no}</i><br /></tpl>'+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'>"+
				"<div class='small-12 columns pdf_links'>"+
					"<tpl if='values.multiple_data_link'><hr/>{multiple_data_link}</tpl>"+
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