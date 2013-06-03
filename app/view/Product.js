Ext.define('ResTube.view.Product',{
	extend: "Ext.Panel",
	alias: "widget.restubeproduct",

	config: {
		styleHtmlContent: true,
        scrollable: true,
        tpl:"<div class='row'>"+
        		"<div class='small-12 columns'>"+
	        		'<ul class="rslides">'+
		        		'<tpl for="media">'+
							'<li><embed src="{url}"></li>'+
	    				'</tpl>'+
					'</div>'+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'>"+
        		"<div class='small-12 columns'>"+
					'<img src="{parts_link}" style="width:100%;">'+
					'<i>Model No: {model_no}</i><br />'+
					'<i>Serial No: {serial_no}</i><br />'+
	        	"</div>"+
        	"</div>"+
        	"<div class='row'>"+
				"<div class='small-12 columns'>"+
					"<tpl if='values.iom_link'><button style='width:100%;' class='actionButton' id='iom_link' name='{iom_link}'>IOM<br /></tpl>"+
					"<tpl if='values.service_bulletin_link'><button style='width:100%;' class='actionButton' name='{service_bulletin_link}' id='service_bulletin_link'>Service Bulletin<br /></tpl>"+
					"<tpl if='values.electrical_link'><button style='width:100%;' class='actionButton' name='{electrical_link}' id='electrical_link'>Electrical Schematic<br /></tpl>"+
					"<tpl if='values.service_history_link'><button style='width:100%;' class='actionButton' name='{service_history_link}' id='service_history_link'>Service History<br /></tpl>"+
					"<tpl if='values.performance_data_link'><button style='width:100%;' class='actionButton' name='{performance_data_link}' id='performance_data_link'>Performance Data<br /></tpl>"+
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
		},{
			element: "element",
			delegate: "button#iom_link",
			event: "tap",
			fn: "onIomLinkTap",
		},{
			element: "element",
			delegate: "button#service_bulletin_link",
			event: "tap",
			fn: "onServiceBulletinLinkTap",
		},{
			element: "element",
			delegate: "button#electrical_link",
			event: "tap",
			fn: "onElectricalLinkTap",
		},{
			element: "element",
			delegate: "button#service_history_link",
			event: "tap",
			fn: "onServiceHistoryLinkTap",
		},{
			element: "element",
			delegate: "button#performance_data_link",
			event: "tap",
			fn: "onPerformanceDataLinkTap",
		},{
            event: "show",
            fn: "onShow",
        }],
	},

	onShow: function(){
		this.getDockedItems()[0].setTitle((this.getData()).name.slice(0,12)+"...");
		$(".rslides").responsiveSlides({
		  auto: true,             // Boolean: Animate automatically, true or false
		  speed: 500,            // Integer: Speed of the transition, in milliseconds
		  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
		  pager: true,           // Boolean: Show pager, true or false
		  nav: true,             // Boolean: Show navigation, true or false
		  random: false,          // Boolean: Randomize the order of the slides, true or false
		  pause: false,           // Boolean: Pause on hover, true or false
		  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
		  prevText: "Previous",   // String: Text for the "previous" button
		  nextText: "Next",       // String: Text for the "next" button
		  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
		  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
		  manualControls: "",     // Selector: Declare custom pager navigation
		  namespace: "rslides",   // String: Change the default namespace used
		  before: function(){},   // Function: Before callback
		  after: function(){}     // Function: After callback
		});
	},

	onBackButtonTap2: function() {
		console.log("onBackButtonTapped2!");
		this.fireEvent("backToResultsCommand", this);
	},

	onIomLinkTap: function() {
		console.log("onIomLinkTap");
		var link = Ext.get("iom_link");
		console.log(link.dom.name);
		this.fireEvent("loadPdfViewerCommand", this, link.dom.name);
		console.log("firedEvent");
	},

	onServiceBulletinLinkTap: function() {
		console.log("onServiceBulletinLinkTap");
		var link = Ext.get("service_bulletin_link");
		console.log(link.dom.name);
		this.fireEvent("loadPdfViewerCommand", this, link.dom.name);
		console.log("firedEvent");
	},

	onElectricalLinkTap: function() {
		console.log("onElectricalLinkTap");
		var link = Ext.get("electrical_link");
		console.log(link.dom.name);
		this.fireEvent("loadPdfViewerCommand", this, link.dom.name);
		console.log("firedEvent");
	},

	onServiceHistoryLinkTap: function() {
		console.log("onServiceHistoryLinkTap");
		var link = Ext.get("service_history_link");
		console.log(link.dom.name);
		this.fireEvent("loadPdfViewerCommand", this, link.dom.name);
		console.log("firedEvent");
	},

	onPerformanceDataLinkTap: function() {
		console.log("onPerformanceDataLinkTap");
		var link = Ext.get("performance_data_link");
		console.log(link.dom.name);
		this.fireEvent("loadPdfViewerCommand", this, link.dom.name);
		console.log("firedEvent");
	},
});