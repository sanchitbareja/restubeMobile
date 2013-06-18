Ext.define('ResTube.view.Whiteboard', {
	extend: "Ext.Panel",
	alias: "widget.whiteboard",
	requires: ['Ext.ux.Fileup'],

	config: {
		styleHtmlContent: true,
        scrollable: null,
        tpl:"<div>To: {user.first_name}</div>"+
        	"<div id='canvasDiv'></div>"+
			'<textarea rows="4" cols="30" name="message" id="messageText"></textarea><br />',

		items: [{
			xtype: "toolbar",
			title: "Whiteboard",
			docked: "top",
			items: [{
                xtype: "button",
                ui: "action",
                text: "cancel",
                id: "cancelButton",
            }, {
            	xtype: 'spacer',
            }, {
            	xtype: 'button',
            	ui: 'action',
            	text: 'Send',
            	id: 'saveCanvasButton',
            }]
		}, {
	        itemId: 'browseFileBtn',
	        xtype: 'fileupload',
	        autoUpload: true,
	        loadAsDataUrl: true,
	        states: {
	            browse: {
	                text: 'Browse and load'
	            },
	            ready: {
	                text: 'Load'
	            },
	            uploading: {
	                text: 'Loading',
	                loading: true
	            }
	        }
	        
	        // For success and failure callbacks setup look into controller
	    }],

        listeners: [{
        	delegate: "#saveCanvasButton",
        	event: "tap",
        	fn: "onSaveCanvas",
        }, {
        	delegate: "#cancelButton",
        	event: "tap",
        	fn: "onCancelTap",
        }],
	},

	onSaveCanvas: function() {
		console.log("save canvas now!");
		var canvas = '';
		var canvasImage = '';
		var canvasImageUrl = '';
		try {
			canvas = document.getElementById('canvasSignature');
			canvasImage = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
			canvasImageUrl = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");
		} catch(err) {
			// do nothing
		}
		var to_user_data = this.getData();

		var root = this.element.dom;
		var messageInput = root.querySelectorAll('textarea[name=message]')[0].value;

		this.fireEvent('saveDrawing', to_user_data, messageInput, canvasImage, canvasImageUrl);
	},

	onCancelTap: function() {
		console.log("cancel canvas button");
		this.fireEvent('cancelDrawing');
	},

});