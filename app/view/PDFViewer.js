Ext.define('ResTube.view.PDFViewer',{
	extend: "Ext.Container",
	alias: "widget.googlepdfviewer",

	config: {
		styleHtmlContent: true,
		styleHtmlCls: 'pdfframe',
        scrollable: true,
        padding: 0,
        margin: 0,
        tpl:'<iframe src="http://docs.google.com/viewer?url={encoded_pdf_url}&embedded=true" width="100%" height="100%" style="border: none;"></iframe>',
		items: [{
			xtype: "toolbar",
			title: "PDF",
			docked: "top",
			items: {
	            xtype: "button",
	            ui: "back",
	            text: "Back",
	            id: "backButton6"
	        },
		}],

        listeners: [{
			delegate: "#backButton6",
			event: "tap",
			fn: "onBackButtonTap6",
		}],
	},

	onBackButtonTap6: function() {
		console.log("onBackButtonTapped6!");
		this.fireEvent("backToProductCommand", this);
	},
});